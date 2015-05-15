/**
 * config module, handle app global app config
 */


let config = null;

/**
 * Set application config
 * @param {Object} cfg config object
 */
export function set(cfg) {
    config = cfg;
}

/**
 * Get config object
 * @return {Object} config
 */
export function get() {
    if (!config) throw new Error('Config get before set');

    return config;
}
