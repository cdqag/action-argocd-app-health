import { ExitCode } from "@actions/core";

import { type Application } from './models/argocd/Application';
import { type ResourceTree } from './models/argocd/ResourceTree';
import { type Events } from './models/argocd/Events';
import { type Pod } from "./models/k8s/Pod";
import { type LogLine } from './models/argocd/LogLine';
import { type LogEntry } from "./models/argocd/LogEntry";
import { type Container } from "./models/k8s/Container";

export class ArgoCDClient {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private get apiUrl() {
    return this.baseUrl + '/api/v1';
  }

  /**
   * Sends a request to the specified endpoint.
   * @param method
   * @param endpoint 
   * @param query
   * @param data
   * @returns 
   */
  private async sendRequest(method: string, endpoint: string, query?: Record<string, string>, data?: Record<string, any>): Promise<Response> {
    const url = new URL(`${this.apiUrl}/${endpoint}`);
    if (query) {
      Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    }

    const headers = {};
    let body: string | undefined;
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await fetch(url, { method, headers, body });
    if (!response.ok) {
      let errorMsg = response.statusText;
      
      try {
        const errorData = await response.json();
        if (errorData && errorData.error && errorData.message) {
          errorMsg = `${errorData.error} --> ${errorData.message}`;
        }
      } catch (e) {
        // Ignore JSON parsing error
      }

      console.error(`${method} request to ${url.toString()} failed: ${errorMsg}`);
      process.exit(ExitCode.Failure);
    }

    return response;
  }

  /**
   * Authenticates the user with the provided username and password.
   * @param username 
   * @param password 
   */
  async authenticate(username: string, password: string): Promise<void> {
    const response = await this.sendRequest('POST', 'session', undefined, {
      username,
      password
    });
    
    const data = await response.json();
    if (!data.token) {
      console.error('Authentication failed: No token received.');
      process.exit(ExitCode.Failure);
    }

    this.token = data.token;
  }

  /**
   * Sends a GET request to the specified endpoint.
   * @param endpoint 
   * @returns 
   */
  private async sendGetRequest(endpoint: string, query?: Record<string, string>): Promise<Record<string, any>> {
    if (!this.token) {
      throw new Error('Authentication token is not set. Please authenticate first.');
    }

    const response = await this.sendRequest('GET', endpoint, query);
    const data = await response.json();

    return data;
  }

  /**
   * Sends a POST request to the specified endpoint with the provided body.
   * @param endpoint 
   * @param body 
   * @returns 
   */
  private async sendPostRequest(endpoint: string, body: Record<string, any>): Promise<Record<string, any>> {
    if (!this.token) {
      throw new Error('Authentication token is not set. Please authenticate first.');
    }

    const response = await this.sendRequest('POST', endpoint, undefined, body);
    const data = await response.json();

    return data;
  }

  /**
   * Get application details
   * @param appName 
   */
  async getApplication(appName: string): Promise<Application> {
    const app = await this.sendGetRequest(`applications/${appName}`);
    return app as Application;
  }

  /**
   * Get application resource tree
   * @param appName 
   */
  async getApplicationResourceTree(appName: string): Promise<ResourceTree> {
    const tree = await this.sendGetRequest(`applications/${appName}/resource-tree`);
    return tree as ResourceTree;
  }

  /**
   * Get application resource events
   * @param appName 
   * @param resourceNamespace
   * @param resourceUID
   * @param resourceName
   */
  async getApplicationResourceEvents(
    appName: string,
    resourceNamespace: string,
    resourceUID: string,
    resourceName: string
  ): Promise<Events> {
    const events = await this.sendGetRequest(`applications/${appName}/events`, {
      resourceNamespace,
      resourceUID,
      resourceName
    });
    return events as Events;
  }

  /**
   * Get application pod manifest
   * @param appName 
   * @param podNamespace
   * @param podName
   */
  async getPodManifest(
    appName: string,
    podNamespace: string,
    podName: string
  ): Promise<Pod> {
    const data = await this.sendGetRequest(`applications/${appName}/resource`, {
      name: podName,
      namespace: podNamespace,
      kind: 'Pod',
      version: 'v1',
      resourceName: podName
    });
    
    if (!data.manifest) {
      console.error(`No manifest found for resource ${podName} in namespace ${podNamespace}`);
      process.exit(ExitCode.Failure);
    }

    const manifest = JSON.parse(data.manifest);
    return manifest as Pod;
  }

  /**
   * Get list of pod containers
   * @param appName 
   * @param podNamespace 
   * @param podName 
   * @returns 
   */
  async getApplicationPodContainers(
    appName: string,
    podNamespace: string,
    podName: string
  ): Promise<Container[]> {
    const manifest = await this.getPodManifest(appName, podNamespace, podName);
    return manifest.spec.containers;
  }

  /**
   * Get application pod container logs
   * @param appName 
   * @param podNamespace 
   * @param podName 
   * @param containerName 
   * @returns 
   */
  async getApplicationPodContainerLogs(
    appName: string,
    podNamespace: string,
    podName: string,
    containerName: string
  ): Promise<LogEntry[]> {
    const response = await this.sendRequest('GET', `applications/${appName}/logs`, {
      namespace: podNamespace,
      podName,
      container: containerName
    });

    const logs: LogEntry[] = []; 
    
    const logsLinesText = await response.text();
    logsLinesText.split("\n").map((line) => {
      line = line.trim();
      if (line === "") {
        return;
      }

      const logLine = JSON.parse(line) as LogLine;
      
      if (!logLine.result.last) {
        logs.push(logLine.result);
      }
    });

    return logs;
  }
}
