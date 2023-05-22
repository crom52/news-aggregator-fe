const FeedContentGid = (() => {
  const feedContentGrid = {
    view: 'datatable',
    id: 'feedContentGrid',
    on: {},
    onClick: {
      'fa-cog': (el, selection) => {
        openEditorWindow(selection);
      },
    },
    scrollY: true,
    height: 700,
    minHeight: 400,
    multiselect: true,
    select: 'row',
    editable: true,
    editaction: 'dblclick',
    css: 'webix_header_border webix_data_border highlight',
    columns: [
      { id: 'id', header: 'ID', width: 150, editor: 'text' },
      { id: 'title', editor: 'text', header: 'Title', fillspace: true },
      { id: 'content', editor: 'text', header: 'Content', width: 200 },
      { id: 'websiteUrl', editor: 'text', header: 'Title', width: 200 },
      {
        header: 'Manual Edit',
        template: `<span class='webix_icon fa fa-cog''></span>`,
        width: 60,
      },
    ],
    data: [
      {
        id: 1,
        title: 'Sample feed title 1 ',
        content: 'This is sample content bla bla 1',
        websiteUrl: 'google.com',
      },
      {
        id: 2,
        title: 'Sample feed title 2 ',
        content: 'This is sample content bla bla 2 ',
        websiteUrl: 'google.com',
      },
      {
        id: 3,
        title: 'Sample feed title 3 ',
        content: 'This is sample content bla bla 3 ',
        websiteUrl: 'google.com',
      },
    ],
  };
  const feedContentGridLayout = {
    view: 'scrollview',
    scroll: 'xy',
    body: { rows: [feedContentGrid] },
  };
  const openEditorWindow = (selection) => {
    let selectedRow = $$('feedContentGrid').getItem(selection.row);
    let form = {
      id: selectedRow.id,
      title: selectedRow.title,
      content: selectedRow.content,
      websiteUrl: selectedRow.websiteUrl,
    };
    $$('manualEditorForm').parse(form);
    $$('manualEditorWindow').show();
  };
  return { feedContentGridLayout };
})();
