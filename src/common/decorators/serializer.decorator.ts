import { applyDecorators, SerializeOptions } from '@nestjs/common';
import {
  ExcludeAttributesFromEntity,
  ExcludeAttributesFromWithoutAuditEntity,
} from 'src/modules/base.entity';

export const Serializer = (options = {}) => {
  return applyDecorators(
    SerializeOptions({
      excludePrefixes: ExcludeAttributesFromEntity,
      ...options,
    }),
  );
};

export const SerializerWithAuditTrail = (options = {}) => {
  return applyDecorators(
    SerializeOptions({
      excludePrefixes: ExcludeAttributesFromWithoutAuditEntity,
      ...options,
    }),
  );
};
