// const separateLines = str.split(/\r?\n|\r|\n/g);
const multiAddLayout = {
  view: 'layout',
  id: 'multiAddLayout',
  hidden: true,
  height: 200,
  rows: [
    {
      id: 'multiAddArea',
      view: 'textarea',
      minWidth: 800,
      label: 'Multi Add',
      height: 150,
      placeholder: 'Paste each URL per line',
    },
    {
      cols: [
        {
          width: 80,
        },
        {
          view: 'button',
          id: 'doneMultiAddBtn',
          value: 'Select',
          width: 100,
          align: 'left',
          on: {
            onItemClick: () => {
              let urlValue = $$('multiAddArea').getValue();
              if (urlValue.length == 0) {
                return;
              }
              const urls = urlValue.split(/\r?\n|\r|\n/g);
              [...new Set(urls)].forEach((u) => {
                var exists = $$('grid')
                  .serialize()
                  .find((e) => e.feedUrl == u);
                if (!exists) {
                  try {
                    var url = new URL(u);
                  } catch (error) {
                    webix.message(error.toString(), 'error');
                    return;
                  }
                  $$('grid').add(
                    {
                      upsertFlg: true,
                      feedUrl: u,
                      websiteUrl: url.hostname,
                    },
                    0
                  );
                  $$('grid').select($$('grid').getFirstId());
                  setTotal();
                }
              });
            },
          },
        },
      ],
    },
  ],
};

const toolbar = {
  view: 'toolbar',
  id: 'toolbar',
  cols: [
    {},
    {
      id: 'buttonGrp',
      cols: [
        {
          view: 'button',
          id: 'multiAddBtn',
          value: 'Add',
          width: 100,
          align: 'right',
          on: {
            onItemClick: () => {
              if ($$('multiAddLayout').isVisible()) {
                $$('multiAddLayout').hide();
              } else {
                $$('multiAddLayout').show();
              }
            },
          },
        },
        // {
        //   view: 'button',
        //   id: 'addBtn',
        //   value: 'Add',
        //   width: 100,
        //   align: 'right',
        //   on: {
        //     onItemClick: () => {
        //       $$('grid').add({ upsertFlg: true }, 0);
        //       $$('grid').select($$('grid').getFirstId());
        //     },
        //   },
        // },
        {
          view: 'button',
          id: 'saveBtn',
          value: 'Save',
          width: 100,
          align: 'right',
          on: {
            onItemClick: async () => {
              const saveData = $$('grid')
                .serialize()
                .filter((e) => e.upsertFlg);
              if (saveData.length == 0) {
                return;
              }
              let confirm = webix
                .confirm({
                  ok: 'Yes',
                  cancel: 'No',
                  text: 'Do you want to save ?',
                })
                .then(function () {
                  //call api to save data;
                })
                .fail(function () {
                  return;
                });
            },
          },
        },
        {
          view: 'button',
          id: 'removeBtn',
          value: 'Remove',
          width: 100,
          align: 'right',
          on: {
            onItemClick: () => {
              const removeData = $$('grid').getSelectedItem();
              const multi = Array.isArray(removeData);
              let text;
              if (multi) {
                text = `Do you want to remove ${removeData.length} items ?`;
                removeData = removeData.filter((e) => e.feedUrl.length > 0);
              } else {
                text = 'Do you want to remove this item ?';
                removeData.feedUrl.length > 0 ? removeData : null;
              }
              if (!removeData) return;
              let confirm = webix
                .confirm({
                  ok: 'Yes',
                  cancel: 'No',
                  text: text,
                })
                .then(function () {
                  //call api remove
                  setTotal();
                })
                .fail(function () {
                  return;
                });
            },
          },
        },
        { width: 30 },
        {
          id: 'count',
          view: 'text',
          label: 'Total',
          labelWidth: 60,
          width: 200,
          value: '100',
          readonly: true,
          width: 125,
        },
      ],
    },
  ],
};
const grid = {
  view: 'datatable',
  id: 'grid',
  on: {
    onAfterEditStop: (value, b, c) => {
      if (value.old != value.value) {
        $$('grid').getSelectedItem().upsertFlg = true;
      }
    },
    onAfterLoad: () => {
      const first = $$('grid').getFirstId();
      if (!first) return;
      $$('grid').select($$('grid').getFirstId());
      setTotal();
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
    { id: 'sourceId', header: 'ID', width: 150, editor: 'text' },
    { id: 'feedUrl', editor: 'text', header: 'URL', fillspace: true },
    {
      id: 'websiteUrl',
      editor: 'text',
      editor: 'text',
      header: 'Host Name',
      width: 200,
    },
    {
      id: 'Note',
      editor: 'text',
      editor: 'text',
      header: 'Note',
      width: 200,
    },
    {
      hidden: true,
      id: 'upsertFlg',
    },
  ],
  data: [
    {
      sourceId: 1,
      feedUrl: 'John Doe',
      websiteUrl: 'A',
      note: '555-555-1234',
      type: 'Student',
    },
    {
      sourceId: 2,
      feedUrl: 'Jane Doe',
      websiteUrl: 'B',
      note: '555-555-5678',
      type: 'Teacher',
    },
    {
      sourceId: 3,
      feedUrl: 'James Smith',
      websiteUrl: 'C',
      note: '555-555-9012',
      type: 'Student',
    },
    {
      sourceId: 4,
      feedUrl: 'Emily Johnson',
      websiteUrl: 'A',
      note: '555-555-3456',
      type: 'Teacher',
    },
    {
      sourceId: 5,
      feedUrl: 'William Brown',
      websiteUrl: 'B',
      note: '555-555-7890',
      type: 'Student',
    },
    {
      sourceId: 6,
      feedUrl: 'Michael Davis',
      websiteUrl: 'A',
      note: '555-555-2345',
      type: 'Teacher',
    },
    {
      sourceId: 7,
      feedUrl: 'Sarah Wilson',
      websiteUrl: 'C',
      note: '555-555-6789',
      type: 'Student',
    },
    {
      sourceId: 8,
      feedUrl: 'David Jones',
      websiteUrl: 'B',
      note: '555-555-0123',
      type: 'Teacher',
    },
    {
      sourceId: 9,
      feedUrl: 'Jessica Lee',
      websiteUrl: 'A',
      note: '555-555-4567',
      type: 'Student',
    },
    {
      sourceId: 10,
      feedUrl: 'Christopher Wilson',
      websiteUrl: 'C',
      note: '555-555-8901',
      type: 'Teacher',
    },
  ],
};
const layoutGrid = {
  view: 'scrollview',
  scroll: 'xy',
  body: grid,
};

webix.ready(function () {
  webix.ui({
    rows: [multiAddLayout, toolbar, layoutGrid],
  });
});

const setTotal = () => {
  $$('count').setValue($$('grid').serialize().length);
};
