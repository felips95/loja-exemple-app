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
      name: 'produtos',
      title: 'Produtos',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'produtos' } }],
    },
  ],
}
