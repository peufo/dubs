/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "landing".
 */
export interface Landing {
  id: string;
  sectionA: {
    text?: {
      [k: string]: unknown;
    }[];
    image?: string | Media;
  };
  sectionB: {
    text?: {
      [k: string]: unknown;
    }[];
    image?: string | Media;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  title?: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes: {
    thumbnail: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    card: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    large: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'user';
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "action".
 */
export interface Action {
  id: string;
  name: string;
  tags?: string[] | Tag[];
  description?: {
    [k: string]: unknown;
  }[];
  image?: string | Media;
  display?: 'row' | 'row_reverse' | 'col' | 'col_reverse';
  inputs: {
    name?: string;
    action?: string | Action;
    groups?: string;
    product?: string | Product;
    /**
     * @minItems 2
     * @maxItems 2
     */
    location?: [number, number];
    id?: string;
  }[];
  outputs: {
    name?: string;
    action?: string | Action;
    groups?: string;
    product?: string | Product;
    /**
     * @minItems 2
     * @maxItems 2
     */
    location?: [number, number];
    id?: string;
  }[];
  resource?: string | Resource;
  timeUnit?: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  estimatedDuration?: number;
  remoteUpdate?: boolean;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tag".
 */
export interface Tag {
  id: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product".
 */
export interface Product {
  id: string;
  name: string;
  tags?: string[] | Tag[];
  unit?: string;
  description?: {
    [k: string]: unknown;
  }[];
  providers: {
    url?: string;
    price?: number;
    id?: string;
  }[];
  variables: (
    | {
        freeValue?: boolean;
        options: {
          value?: string;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'text';
      }
    | {
        freeValue?: boolean;
        unit?: string;
        options: {
          value?: number;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'numeric';
      }
  )[];
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resource".
 */
export interface Resource {
  id: string;
  name: string;
  description?: {
    [k: string]: unknown;
  }[];
  immaterial?: boolean;
  relative?: boolean;
  parent?: string | Resource;
  /**
   * @minItems 2
   * @maxItems 2
   */
  location: [number, number];
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "state".
 */
export interface State {
  id: string;
  name?: string;
  product?: string | Product;
  /**
   * @minItems 2
   * @maxItems 2
   */
  location?: [number, number];
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "item".
 */
export interface Item {
  id: string;
  product: string | Product;
  steps: {
    action?: string | Action;
    id?: string;
  }[];
  virtual?: boolean;
  validity: {
    start?: string;
    end?: string;
  };
  createdAt: string;
  updatedAt: string;
}
