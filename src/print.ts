import * as core from '@actions/core';

import { ArgoCDClient } from './argocd';
import { type Health } from './argocd/models/argocd/Health';
import { type Events } from './argocd/models/argocd/Events';
import { type LogEntry } from './argocd/models/argocd/LogEntry';
import { HealthStatus } from './argocd/models/argocd/HealthStatus';
import { annotateWithMatchingInterpreter } from './interpreters';
import { RequestError } from './argocd/client';


const ERROR_EVENT_RESON_REGEXP = /Error|Fail|Exception|Not|Timeout|BackOff|Unhealthy/;

/**
 * Prints the health status of an entity (e.g. application, resource, etc.)
 * @param entityName 
 * @param health 
 */
export const printHealth = (entityName: string, health: Health): void => {
  let msg =`${entityName} is in ${health.status} state`;

  if (health.message) {
    msg += ` because: ${health.message}`;
  }

  if (health.status === HealthStatus.Healthy) {
    console.info('💚 ' + msg);
  } else if (health.status === HealthStatus.Degraded) {
    console.error('💔 ' + msg);
    core.error(msg);
  } else if (health.status === HealthStatus.Error) {
    console.error('❗ ' + msg);
    core.error(msg);
  } else if (health.status === HealthStatus.Progressing) {
    console.warn('🔵 ' + msg);
    core.warning(msg);
  } else if (health.status === HealthStatus.Unknown) {
    console.warn('❓ ' + msg);
    core.warning(msg);
  } else if (health.status === HealthStatus.Suspended) {
    console.warn('🟨 ' + msg);
    core.warning(msg);
  } else if (health.status === HealthStatus.Missing) {
    console.warn('⚪ ' + msg);
    core.warning(msg);
  }
};

/**
 * Prints the events of a resource in an ArgoCD application
 * @param argocd 
 * @param appName 
 * @param resourceKind 
 * @param resourceNamespace 
 * @param resourceUID 
 * @param resourceName 
 */
export const printResourceEvents = async (
  argocd: ArgoCDClient,
  appName: string,
  resourceKind: string,
  resourceNamespace: string,
  resourceUID: string,
  resourceName: string
) => {
  let events: Events;

  try {
    events = await argocd.getApplicationResourceEvents(appName, resourceNamespace,resourceUID, resourceName);
  } catch (error) {
    if (error instanceof RequestError) {
      if (error.statusCode === 403) {
        core.warning(`You don't have permission to access the events for ${resourceKind} ${resourceName}`);
        return;
      }
    }
    core.warning(`Couldn't fetch events for ${resourceKind} ${resourceName}: ${error}`);
    return;
  }

  if (events.items && events.items.length > 0) {
    console.log(`  ↘️ ${resourceKind} ${resourceName} has the following events:`);
    for (const e of events.items) {
      const msg = `${e.reason} (${e.count}): ${e.message}`;
      if (ERROR_EVENT_RESON_REGEXP.test(e.reason)) {
        console.error(`    ❗ ${msg}`);
        core.error(msg);
      } else {
        console.log(`    ℹ️ ${msg}`);
      }
    }
  } else {
    console.log(`  ℹ️ ${resourceKind} ${resourceName} has no events`);
  }
}

/**
 * Prints the logs of a container in a pod in an ArgoCD application
 * @param argocd 
 * @param appName 
 * @param podNamespace 
 * @param podName 
 * @param containerName 
 */
export const printPodContainerLogs = async (
  argocd: ArgoCDClient,
  appName: string,
  podNamespace: string,
  podName: string,
  containerName: string
) => {
    let logs: LogEntry[];

    try {
      logs = await argocd.getApplicationPodContainerLogs(appName, podNamespace, podName, containerName);
    } catch (error) {
      if (error instanceof RequestError) {
        if (error.statusCode === 403) {
          core.warning(`You don't have permission to access the logs for Pod's ${podName} container ${containerName}`);
          return;
        }
      }
      core.warning(`Couldn't fetch logs for Pod's ${podName} container ${containerName}: ${error}`);
      return;
    }

    if (logs.length > 0) {
      console.log(`      ↘️ Logs:`);
      for (const log of logs) {
        console.log(`        ${log.content}`);

        try {
          annotateWithMatchingInterpreter(log.content);
        } catch (error) {
          // Ignore errors from the interpreter
        }
      }
    } else {
      console.info(`      ℹ️ No logs found`);
    }
}
