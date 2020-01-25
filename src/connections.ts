/**
 * Connections represent access to functionality available in third party products.  Examples of connections
 * are Jira, OpsLevel, Slack, etc.  Connections are defined in a very open ended way only limited to having a connect
 * and disconnect.
 *
 * The connection object is used as the base class for a connection extension.  Connections must have a connect
 * and disconnect.  You can use these however you wish but just know that connect is called on construction and
 * disconnect may not be called depending on how the connection is being used.
 */
export abstract class Connection {
    public name: string;
    public config: ConnectionConfig;

    constructor(config: ConnectionConfig) {
        this.config = config;
        this.connect();
    }

    public abstract connect(): Connection;

    public abstract disconnect(): boolean;
}

/**
 * This is the Connection factor function that is exported by default from the main connection file.  This will
 * be called each time a module requests the creation of a new connection.
 */
export type ConnectionFactory = (cfg: ConnectionConfig) => Connection;

export type ConnectionConfig = Record<string, any>;
export type ConnectionRequestDefinition = {
    name: string,
    config: ConnectionConfig
};
export type ConnectionMap = Record<string, Connection>;

const moduleConnections: ConnectionMap = {};

export const storeModuleConnection = (conn: Connection) => {
    moduleConnections[conn.name] = conn;
};

export const findModuleConnection = (name: string | string[]): Connection => {

    if (typeof name === "string") {
        if (name in moduleConnections) {
            return moduleConnections[name];
        }
    } else {
        const availableNames = new Set(Object.keys(moduleConnections));
        for (const elem of name) {
            if (availableNames.has(elem)) {
                return moduleConnections[elem];
            }
        }
    }

    return undefined;
};
