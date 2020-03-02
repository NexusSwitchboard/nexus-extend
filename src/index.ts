import { INexusModuleDefinition } from "./modules";
import { INexusConnectionDefinition } from "./connections";

export {
    Connection,
    ConnectionRequest,
    ConnectionConfig,
    ConnectionMap,
    ConnectionFactory,
    INexusConnectionDefinition
} from "./connections";

export {
    Job,
    NexusJobDefinition,
    NexusJobOptions,
    NexusJobStatus
} from "./jobs";

export {
    NexusModule,
    ModuleConfig,
    IRouteDefinition,
    INexusActiveModule,
    INexusModuleDefinition
} from "./modules";

export {
    findNestedProperty,
    findProperty,
    getNestedVal,
    hasOwnProperties,
    loadTemplate,
    replaceAll
} from "./helpers";


export interface INexusDefinition {
    rootUri: string;
    authentication: {
        auth0: {
            jwksUri: string;
            audience: string;
            issuer: string;
            algorithms: string[];
        }
    };
    connections: INexusConnectionDefinition[];

    modules: {
        [index: string]: INexusModuleDefinition;
    },

}
