import { rest } from 'msw'
import { urls } from '../constants'
import { voteErrorHandlers, voteHandlers } from './handlers/vote'

export const handlers = [
  rest.post(urls.logIn, (req, res, ctx) => res(ctx.status(204))),

  // Handles a POST /register request
  rest.post(urls.register, (req, res, ctx) => res(ctx.status(204))),

  rest.post(urls.createResource, (req, res, ctx) => res(ctx.status(204))),

  rest.get(urls.getMe, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          name: 'string',
          dni: 'string',
          email: 'user@example.cat',
          role: 'ADMIN',
          status: 'ACTIVE',
        },
      ])
    )
  ),

  rest.get(urls.getCategories, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          name: 'React',
          slug: 'react',
        },
      ])
    )
  ),

  // eslint-disable-next-line consistent-return
  rest.get(urls.getTopics, (req, res, ctx) => {
    const slug = req.url.searchParams.get('slug')
    if (slug === 'react') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 'cli04v2l0000008mq5pwx7w5j',
            name: 'Listas',
            slug: 'listas',
            categoryId: 'clh78rhsk000008l0ahamgoug',
          },
          {
            id: 'cli04uxud000609k37w9phejw',
            name: 'Renderizado condicional',
            slug: 'renderizado-condicional',
            categoryId: 'clh78rhsk000008l0ahamgoug',
          },
        ])
      )
    }
    if (slug === 'empty-topics') {
      return res(ctx.status(200), ctx.json([]))
    }
    if (slug === 'invalid-slug') {
      return res(
        ctx.status(404),
        ctx.json({ message: 'No category found with this slug' })
      )
    }
  }),

  rest.get(urls.getResources, (req, res, ctx) => {
    const categorySlug = req.url.searchParams.get('slug')
    if (categorySlug === 'emptyResource') {
      return res(ctx.status(200), ctx.json([]))
    }

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 'resourceId',
          title: 'Resource Test',
          description: 'Resource Test Description',
          url: 'http://www.google.com',
          createdAt: '2023-02-17T03:07:00',
          updatedAt: '2023-05-17T03:07:00',
          user: {
            name: 'Test User Name',
            email: 'test@mail.com',
          },
          voteCount: {
            upvote: 6,
            downvote: 2,
            total: 4,
          },
        },
      ])
    )
  }),

  rest.get(urls.getTypes, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(['Test type 1', 'Test type 2', 'Test type 3'])
    )
  ),

  rest.get(urls.getFavorites, (req, res, ctx) => {
    const favoritesUserId = req.url.searchParams.get('userId')
    if (favoritesUserId === 'emptyResource') {
      return res(ctx.status(200), ctx.json([]))
    }

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 'favoriteId',
          title: 'My favorite title',
          slug: 'my-favorite',
          description: 'Favorite description',
          url: 'https://tutorials.cat/learn/javascript',
          resourceType: 'VIDEO',
          userId: 'userId',
          createdAt: '11/11/2011',
          updatedAt: '12/12/2012',
        },
      ])
    )
  }),

  rest.get(urls.getResourcesByUser, (req, res, ctx) => {
    const categorySlug = req.url.searchParams.get('category')
    if (categorySlug === 'emptyResource') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            resources: [],
          },
        ])
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        resources: [
          {
            id: 'resourceId',
            title: 'Resource title',
            slug: 'react',
            description: 'Resource description',
            url: 'https://reactjs.org/',
            user: {
              name: 'string',
              email: 'user@example.cat',
            },
            topics: [
              {
                topic: {
                  id: 'topicId1',
                  name: 'Topic 1',
                  slug: 'topic-1',
                  categoryId: 'categoryId1',
                },
              },
            ],
            voteCount: {
              upvote: 10,
              downvote: 2,
              total: 8,
            },
          },
        ],
      })
    )
  }),
  ...voteHandlers,
]

export const errorHandlers = [
  rest.get(urls.getCategories, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.get(urls.getTopics, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.get(urls.getResources, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  rest.get(urls.getTypes, (_, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
  ),

  // eslint-disable-next-line consistent-return
  rest.get(urls.getFavorites, (req, res, ctx) =>
    res(ctx.status(404), ctx.json({ message: 'Invalid userId' }))
  ),

  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(401), ctx.json({ message: 'User not found' }))
  ),
  rest.put(urls.vote, (_, res, ctx) =>
    res(ctx.status(404), ctx.json({ message: 'User or resource not found' }))
  ),

  rest.get(urls.getResourcesByUser, (req, res, ctx) => {
    const categorySlug = req.url.searchParams.get('category')

    if (categorySlug === 'errorCase') {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Internal server error' })
      )
    }
    return res(ctx.status(401), ctx.json({ message: 'User not found' }))
  }),
  ...voteErrorHandlers,
]
