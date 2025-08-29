export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Red', value: 'red' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Indigo', value: 'indigo' },
          { title: 'Pink', value: 'pink' },
        ],
      },
      initialValue: 'blue',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon for the category',
      initialValue: '📁',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'icon',
    },
  },
}
