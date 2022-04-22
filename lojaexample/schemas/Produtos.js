export default {
  name: 'produtos',
  title: 'Produtos',
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
      name: 'description',
      title: 'Descrição',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Preço',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tags' } }],
    },
  ],
}
