import * as core from '@actions/core';

import { ArgoCDClient } from './argocd';
import { type Health } from './argocd/models/argocd/Health';
import { HealthStatus } from './argocd/models/argocd/HealthStatus';
import { annotateWithMatchingInterpreter } from './interpreters';


const ERROR_EVENT_RESON_REGEXP = /Error|Fail|Exception|Not|Timeout|BackOff/;

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

export const printResourceEvents = async (
  argocd: ArgoCDClient,
  appName: string,
  resourceKind: string,
  resourceNamespace: string,
  resourceUID: string,
  resourceName: string
) => {
  const events = await argocd.getApplicationResourceEvents(appName, resourceNamespace,resourceUID, resourceName);
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

export const printPodContainerLogs = async (
  argocd: ArgoCDClient,
  appName: string,
  podNamespace: string,
  podName: string,
  containerName: string
) => {
    const logs = await argocd.getApplicationPodContainerLogs(appName, podNamespace, podName, containerName);

    if (logs.length > 0) {
      console.log(`      ↘️ Logs:`);
      for (const log of logs) {
        console.log(`        ${log.content}`);
        annotateWithMatchingInterpreter(log.content);
      }
    } else {
      console.info(`      ℹ️ No logs found`);
    }
}
