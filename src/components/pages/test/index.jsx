import Card from '../../ui/Card'
import Button from '../../ui/Button'

const TestInterface = () => {
  return (
    <div className='p-4 space-y-4'>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="danger">Danger Button</Button>
      <Button variant="success">Success Button</Button>
      <Card className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-2">Card Title</h2>
        <p className="text-gray-700">This is a simple card component using Tailwind CSS.</p>
      </Card>
    </div>
  )
}

export default TestInterface