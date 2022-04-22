export default {
  name: 'colections',
  title: 'Coleções',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'prod',
      title: 'Produtos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'produtos',
              title: 'Produtos',
              type: 'reference',
              to: [{ type: 'produtos' }],
            },
          ],
        },
      ],
    },
  ],
}
