const host = '127.0.0.1';
let menuList = [
  {
    icon: 'mdi mdi-view-dashboard',
    id: 'layoutFeedUrlGrid',
    value: 'URL Source Management',
    data: [],
  },
  {
    id: 'feedContentGrid',
    icon: 'mdi mdi-table',
    value: 'Feed Management',
    data: [],
  },
];

const manualEditor = {
  view: 'window',
  close: true,
  id: 'manualEditorWindow',
  head: 'Manual Editor',
  position: 'center',
  move: true,
  width: 700,
  height: 600,
  body: {
    rows: [
      {
        view: 'form',
        id: 'manualEditorForm',
        rows: [
          { view: 'text', id: 'manualEditorTitle', name: 'title' },
          {
            name: 'content',
            id: 'manualEditorContent',
            view: 'textarea',
          },
          {
            id: 'saveManualEditorBtn',
            view: 'button',
            value: 'Save',
            on: {
              onItemClick: () => {
                webix
                  .confirm({
                    ok: 'Yes',
                    cancel: 'No',
                    text: 'Do you want to save ?',
                  })
                  .then(function () {
                    //call api to save data;
                    $$('manualEditorWindow').hide();
                  })
                  .fail(function () {
                    return;
                  });
              },
            },
          },
        ],
      },
    ],
  },
};

webix.ready(function () {
  webix.ui(manualEditor);
  webix.ui({
    rows: [
      {
        view: 'toolbar',
        padding: 3,
        elements: [
          {
            view: 'icon',
            icon: 'mdi mdi-menu',
            click: function () {
              $$('$sidebar1').toggle();
            },
          },
          { view: 'label', label: 'News Management' },
          {},
        ],
      },
      {
        cols: [
          {
            minHeight: 700,
            view: 'sidebar',
            data: menuList,
            on: {
              onAfterSelect: function (id) {
                $$('rightLayout').reconstruct();
                if (id == 'layoutFeedUrlGrid') {
                  $$('rightLayout').addView(FeedUrlGid.layoutFeedUrlGrid);
                } else if (id == 'feedContentGrid') {
                  $$('rightLayout').addView(
                    FeedContentGid.feedContentGridLayout
                  );
                }
              },
            },
          },
          { id: 'rightLayout', rows: [] },
        ],
      },
    ],
  });
});

const setTotal = () => {
  $$('count').setValue($$('grid').serialize().length);
};
