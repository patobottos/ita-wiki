import { render, screen, fireEvent } from '../test-utils'
import EditResource from '../../components/organisms/EditResource'

test('Renders EditResource when resource is editable', () => {
  const props = {
    description: 'Sample description',
    id: '1',
    title: 'Sample title',
    url: 'https://example.com',
    resourceType: 'Sample resource type',
    topics: [],
    editable: true,
  }

  render(<EditResource {...props} />)

  expect(screen.getByTestId('edit-icon')).toBeInTheDocument()
  const editIcon = screen.getByTestId('edit-icon')

  fireEvent.click(editIcon)

  expect(screen.getByTestId('resource-form')).toBeInTheDocument()
  expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
  expect(screen.getByLabelText('Título')).toBeInTheDocument()
  expect(screen.getByLabelText('URL')).toBeInTheDocument()
})
