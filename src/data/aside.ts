const data = [
  {
    slug: 'dashboard',
    icon: 'layout-4-blocks',
    label: 'aside.dashboards',
    to: '/'
  },
  {
    slug: 'ui',
    icon: 'color-profile',
    label: 'aside.ui',
    to: '/ui',
    subs: [
      {
        icon: 'star',
        slug: 'ui-icons',
        label: 'aside.icons',
        to: '/ui/icons'
      },
    ]
  },
  {
    slug: 'user',
    icon: 'user',
    label: 'aside.users',
    to: '/users',
    subs: [
      {
        icon: 'group',
        slug: 'users',
        label: 'aside.users',
        to: '/users'
      },
      {
        icon: 'add-user',
        slug: 'users-new',
        label: 'aside.users-add-new',
        to: '/users/new'
      },
    ]
  },
  {
    slug: 'pages',
    icon: 'display1',
    label: 'aside.pages',
    to: '/pages',
    subs: [
      {
        slug: 'pages-authorization',
        label: 'aside.authorization',
        to: '/user',
        subs: [
          {
            icon: 'simple-icon-user-following',
            label: 'aside.login',
            to: '/user/login',
            newTab: true,
          },
          {
            icon: 'simple-icon-user-follow',
            label: 'aside.register',
            to: '/user/register',
            newTab: true,
          },
          {
            icon: 'simple-icon-user-following',
            label: 'aside.forgot-password',
            to: '/user/forgot-password',
            newTab: true,
          },
          {
            icon: 'simple-icon-user-unfollow',
            label: 'aside.reset-password',
            to: '/user/reset-password',
            newTab: true,
          },
        ],
      },
      {
        slug: 'pages-product',
        label: 'aside.product',
        to: '/pages/product',
        subs: [
          {
            icon: 'simple-icon-credit-card',
            label: 'aside.data-list',
            to: '/pages/product/data-list',
          },
          {
            icon: 'simple-icon-list',
            label: 'aside.thumb-list',
            to: '/pages/product/thumb-list',
          },
          {
            icon: 'simple-icon-grid',
            label: 'aside.image-list',
            to: '/pages/product/image-list',
          },
          {
            icon: 'simple-icon-picture',
            label: 'aside.details',
            to: '/pages/product/details',
          },
          {
            icon: 'simple-icon-book-open',
            label: 'aside.details-alt',
            to: '/pages/product/details-alt',
          },
        ],
      },
      {
        slug: 'pages-profile',
        label: 'aside.profile',
        to: '/pages/profile',
        subs: [
          {
            icon: 'simple-icon-share',
            label: 'aside.social',
            to: '/pages/profile/social',
          },
          {
            icon: 'simple-icon-link',
            label: 'aside.portfolio',
            to: '/pages/profile/portfolio',
          },
        ],
      },
      {
        slug: 'pages-blog',
        label: 'aside.blog',
        to: '/pages/blog',
        subs: [
          {
            icon: 'simple-icon-share',
            label: 'aside.blog-list',
            to: '/pages/blog/blog-list',
          },
          {
            icon: 'simple-icon-link',
            label: 'aside.blog-detail',
            to: '/pages/blog/blog-detail',
          },
        ],
      },
      {
        slug: 'pages-miscellaneous',
        label: 'aside.miscellaneous',
        to: '/pages/miscellaneous',
        subs: [
          {
            icon: 'simple-icon-question',
            label: 'aside.faq',
            to: '/pages/miscellaneous/faq',
          },
          {
            icon: 'simple-icon-graduation',
            label: 'aside.knowledge-base',
            to: '/pages/miscellaneous/knowledge-base',
          },

          {
            icon: 'simple-icon-diamond',
            label: 'aside.prices',
            to: '/pages/miscellaneous/prices',
          },
          {
            icon: 'simple-icon-magnifier',
            label: 'aside.search',
            to: '/pages/miscellaneous/search',
          },
          {
            icon: 'simple-icon-envelope-open',
            label: 'aside.mailing',
            to: '/pages/miscellaneous/mailing',
          },
          {
            icon: 'simple-icon-bag',
            label: 'aside.invoice',
            to: '/pages/miscellaneous/invoice',
          },

          {
            icon: 'simple-icon-exclamation',
            label: 'aside.error',
            to: '/error',
            newTab: true,
          },
        ],
      },
    ],
  },
  {
    slug: 'documemts',
    icon: 'selected-file',
    label: 'aside.documents',
    to: '/documents',
    newTab: true
  }
]

export default data