import { createContext } from "react";

export const PermissionsContext = createContext({
  perm_visual_rebanho: null,
  perm_visual_calendario: null,
  perm_visual_grupos: null,
  perm_alter_rebanho: null,
  perm_alter_calendario: null,
  perm_alter_usuario_grupo: null
});