export function useEventListener(type: any, handler: any): void;
/**
 * Hooks up post messages to callbacks
 * @param {Object.<string, function>} events A mapping of message type to callback
 */
export function useIFramePluginEvents(events: {
    [x: string]: Function;
}): void;
/**
 * A hook to monitor message about changes in iframe content height
 * @param onIframeLoaded A callback for when the frame is loaded
 * @returns {[boolean, number]}
 */
export function useIFrameHeight(onIframeLoaded?: null): [boolean, number];
