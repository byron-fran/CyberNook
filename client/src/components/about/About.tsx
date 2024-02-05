
import AboutMessage from './AboutMessage'
import FormQuestion from './FormQuestion'

const About = () => {
  return (
    <div className='w-full bg-black bg-opacity-70 p-8 bg-[url(/images/about.jpg)] bg-center bg-no-repeat bg-blend-multiply mt-10 '>

        <div className='grid md:grid-cols-2 gap-4'>
            <AboutMessage />
            <FormQuestion />
        </div>
    </div>
  )
}

export default About