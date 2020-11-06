import { Divisions } from '.'

let divisions

beforeEach(async () => {
  divisions = await Divisions.create({ name: 'test', createdBy: 'test', createdDate: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = divisions.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(divisions.id)
    expect(view.name).toBe(divisions.name)
    expect(view.createdBy).toBe(divisions.createdBy)
    expect(view.createdDate).toBe(divisions.createdDate)
    expect(view.description).toBe(divisions.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = divisions.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(divisions.id)
    expect(view.name).toBe(divisions.name)
    expect(view.createdBy).toBe(divisions.createdBy)
    expect(view.createdDate).toBe(divisions.createdDate)
    expect(view.description).toBe(divisions.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
