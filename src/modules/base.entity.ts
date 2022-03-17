import { Expose } from 'class-transformer';
import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  UpdatedAt,
} from 'sequelize-typescript';
import { FindOptions } from 'sequelize';
import { Logger } from '@nestjs/common';

export const ExcludeAttributesFromEntity = [
  'dataValues',
  '_',
  'uniqno',
  'isNewRecord',
];
export const ExcludeAttributesFromWithoutAuditEntity = [
  'dataValues',
  '_',
  'uniqno',
  'isNewRecord',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'createdBy',
  'updatedBy',
];
export const ExcludeColumn = {
  exclude: ['createdAt', 'updatedAt', 'deletedAt', 'createdBy', 'updatedBy'],
};

export type PaginationOptions = {
  page?: number;
  pageSize?: number;
} & FindOptions;

export type PaginationResult<I> = {
  results: I[];
  options: {
    page: number;
    per_page: number;
    page_count: number;
    total_count: number;
  };
};

class PaginatedEntity extends Model {
  static async paginate<T extends typeof PaginatedEntity, I = InstanceType<T>>(
    this: T,
    { page = 1, pageSize = 25, ...params }: PaginationOptions = {
      page: 1,
      pageSize: 25,
    },
  ): Promise<PaginationResult<I>> {
    const options = Object.assign({}, params);

    const countOptions = Object.keys(options).reduce((acc, key) => {
      if (!['order', 'attributes', 'include'].includes(key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc[key] = options[key];
      }
      return acc;
    }, {});

    options.limit = pageSize;
    options.offset = pageSize * (page - 1);

    if (params.limit) {
      Logger.warn(`(sequelize-pagination) Warning: limit option is ignored.`);
    }

    if (params.offset) {
      Logger.warn(`(sequelize-pagination) Warning: offset option is ignored.`);
    }

    if (params.order) options.order = params.order;

    const [count, rows] = await Promise.all([
      this.count(countOptions),
      this.findAll(options),
    ]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const total = options.group !== undefined ? count['length'] : count;
    const typedRows = rows as unknown as I[];
    const pages = Math.ceil(total / pageSize);

    return {
      results: typedRows,
      options: {
        page: page,
        per_page: pageSize,
        page_count: pages,
        total_count: total,
      },
    };
  }
}

export class BaseEntity extends PaginatedEntity {
  @CreatedAt
  @Expose({ name: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Expose({ name: 'updated_at' })
  updatedAt!: Date;

  @DeletedAt
  @Expose({ name: 'deleted_at' })
  deletedAt!: Date;

  @Column({ allowNull: true })
  @Expose({ name: 'created_by' })
  createdBy!: bigint;

  @Column({ allowNull: true })
  @Expose({ name: 'updated_by' })
  updatedBy!: bigint;
}
