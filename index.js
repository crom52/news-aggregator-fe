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
              [...new Set(urls)].forEach((url) => {
                var exists = $$('grid')
                  .serialize()
                  .find((e) => e.url == url);
                if (!exists) {
                  try {
                    var url = new URL(url);
                  } catch (error) {
                    webix.message(error.toString(), 'error');
                    return;
                  }
                  $$('grid').add(
                    {
                      upsertFlg: true,
                      url: url,
                      hostName: new URL(url).hostname,
                    },
                    0
                  );
                  $$('grid').select($$('grid').getFirstId());
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
              let confirm = await webix.confirm({
                ok: 'Yes',
                cancel: 'No',
                text: 'Do you want to save ?',
              });
              if (confirm) {
                //call api to save data;
              }
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
            onItemClick: async () => {
              const removeData = $$('grid').getSelectedItem();
              const multi = Array.isArray(removeData);
              let text;
              if (multi) {
                text = `Do you want to remove ${removeData.length} items ?`;
                removeData = removeData.filter((e) => e.url.length > 0);
              } else {
                text = 'Do you want to remove this item ?';
                removeData.url.length > 0 ? removeData : null;
              }
              if (!removeData) return;
              let confirm = await webix.confirm({
                ok: 'Yes',
                cancel: 'No',
                text: text,
              });
              if (confirm) {
                //call api remove
              }
            },
          },
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
      $$('grid').select($$('grid').getFirstId());
    },
  },
  scrollY: true,
  height: 700,
  minHeight: 400,
  multiselect: true,
  select: 'row',
  editable: true,
  editaction: 'dblclick',
  scheme: {
    $change: function (item) {
      if (item.hostName == 'A') item.$css = 'highlight';
    },
  },
  css: 'webix_header_border webix_data_border highlight',
  columns: [
    { id: 'sourceId', header: 'ID', width: 150, editor: 'text' },
    { id: 'url', editor: 'text', header: 'URL', fillspace: true },
    {
      id: 'hostName',
      editor: 'text',
      editor: 'text',
      header: 'hostName',
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
      url: 'John Doe',
      hostName: 'A',
      note: '555-555-1234',
      type: 'Student',
    },
    {
      sourceId: 2,
      url: 'Jane Doe',
      hostName: 'B',
      note: '555-555-5678',
      type: 'Teacher',
    },
    {
      sourceId: 3,
      url: 'James Smith',
      hostName: 'C',
      note: '555-555-9012',
      type: 'Student',
    },
    {
      sourceId: 4,
      url: 'Emily Johnson',
      hostName: 'A',
      note: '555-555-3456',
      type: 'Teacher',
    },
    {
      sourceId: 5,
      url: 'William Brown',
      hostName: 'B',
      note: '555-555-7890',
      type: 'Student',
    },
    {
      sourceId: 6,
      url: 'Michael Davis',
      hostName: 'A',
      note: '555-555-2345',
      type: 'Teacher',
    },
    {
      sourceId: 7,
      url: 'Sarah Wilson',
      hostName: 'C',
      note: '555-555-6789',
      type: 'Student',
    },
    {
      sourceId: 8,
      url: 'David Jones',
      hostName: 'B',
      note: '555-555-0123',
      type: 'Teacher',
    },
    {
      sourceId: 9,
      url: 'Jessica Lee',
      hostName: 'A',
      note: '555-555-4567',
      type: 'Student',
    },
    {
      sourceId: 10,
      url: 'Christopher Wilson',
      hostName: 'C',
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
