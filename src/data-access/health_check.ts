import { Server } from '@hapi/hapi';
import Promise from 'bluebird';

const mongoStatus: any = {
  '0': 'disconnected',
  '1': 'connected',
  '2': 'connecting',
  '3': 'disconnecting',
  '99': 'uninitialized',
};
let showStatus = false;
let firstAttempt = false;
const healthCheck = (server: Server, config: any, Mongoose: any) => {
  const REQUEST_DELAY = config.healthCheck.delay;
  server.log(['info', 'mongo'], 'Waiting for  MongoDB');
  const waitForPong = (Mongoose: any) => {
    if (Mongoose.connection.readyState !== 1 && Mongoose.connection.readyState !== 2) {
      server.log(['info', 'mongo', `${mongoStatus[Mongoose.connection.readyState]}`], 'Unable to connect to Mongodb.');
      firstAttempt = false;
    }
    if (Mongoose.connection.readyState === 2) {
      firstAttempt = false;
      server.log(['info', 'mongo', `${mongoStatus[Mongoose.connection.readyState]}`], `- ${mongoStatus[Mongoose.connection.readyState]}...`);
    }
    if (Mongoose.connection.readyState === 1 && !firstAttempt) {
      showStatus = true;
    }

    return Promise.delay(REQUEST_DELAY).then(Mongoose.connection.readyState);
  };

  function waitUntilReady() {
    return new Promise((resolve) => {
      server.log(['info', 'mongo'], resolve);
    });
  }

  function setGreenStatus() {
    if (showStatus) {
      showStatus = false;
      firstAttempt = true;
      return server.log(['info', 'mongo', `${mongoStatus[Mongoose.connection.readyState]}`], `- ${mongoStatus[Mongoose.connection.readyState]}.`);
    }
  }

  function check() {
    const healthCheck = waitForPong(Mongoose);
    return healthCheck.then(setGreenStatus).catch((err: string | object | (() => any) | undefined) => {
      showStatus = false;
      server.log(['error', 'mongo'], err);
    });
  }
  let timeoutId: NodeJS.Timeout | null = null;

  function scheduleCheck(ms: number) {
    if (timeoutId) return;

    const myId = setTimeout(function () {
      check().finally(function () {
        if (timeoutId === myId) startorRestartChecking();
      });
    }, ms);

    timeoutId = myId;
  }

  function startorRestartChecking() {
    scheduleCheck(stopChecking() ? REQUEST_DELAY : 1);
  }

  function stopChecking() {
    if (!timeoutId) return false;
    clearTimeout(timeoutId);
    timeoutId = null;
    return true;
  }

  server.ext('onPreStop', stopChecking);

  return {
    waitUntilReady: waitUntilReady,
    run: check,
    start: startorRestartChecking,
    stop: stopChecking,
    isRunning: function () {
      return !!timeoutId;
    },
  };
};

export { healthCheck };
