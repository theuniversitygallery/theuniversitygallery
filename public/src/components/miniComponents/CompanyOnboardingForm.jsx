import Button from './Button'
import { FaChevronRight } from 'react-icons/fa'
import { Form, useSubmit } from 'react-router-dom'

const CompanyOnboardingForm = ({userId, userType}) => {
  const submitThis = useSubmit();

  const handleSubmit = (Event) => {
    Event.preventDefault();

    const formData = new FormData(Event.target);
    formData.append("isMovable", document.querySelector('input[name="isMovable"]:checked').value);

    submitThis(Event.target);
}

  return (
    <Form onSubmit={handleSubmit} method='post' encType='multipart/form-data'>
          <input type="text" defaultValue={userId} className='hidden' name='userId' />
          <input type="text" defaultValue={userType} className='hidden' name='userType' />
          <div className='flex gap-4 max-md:flex-col'>
            <section className='w-1/2 max-md:w-full'>
              {/* Business Movability */}
              <label className='text-base font-semibold mt-2' htmlFor="">My company is:</label>
              <div className="w-full flex gap-3 mb-3">
                  <label className="cursor-pointer w-1/2">
                      <input required type="radio" value="Fixed Location" name="isMovable" className="sr-only peer" />
                      <div className="flex gap-3 justify-center items-center rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out px-2 py-3 text-lg peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                          In a fixed location
                      </div>
                  </label>
                  <label className="cursor-pointer w-1/2">
                      <input type="radio" name="isMovable" value="Movable Business" className="sr-only peer" />
                      <div className="rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out px-2 py-3 text-lg peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                          Is movable
                      </div>
                  </label>
              </div>

              {/* Business Type */}
              <label htmlFor="companyType" className='block font-semibold'>Company Type:</label>
              <select required name="companyType" className='w-full p-2 bg-transparent outline-none border border-altBgColor rounded' id="">
                <option value="Global">Global</option>
                <option value="Medium">Medium</option>
                <option value="Startup">Startup</option>
                <option value="Agency">Agency</option>
              </select>

              {/* Field Associated */}
              <label htmlFor="fieldAssociated" className='mt-3 block font-semibold'>Field Associated:</label>
              <select required name="fieldAssociated" className='w-full p-2 bg-transparent outline-none border border-altBgColor rounded' id="">
                <option value="Information & IT">Information & IT</option>
                <option value="Mining">Mining</option>
                <option value="Finance">Finance</option>
                <option value="Fintech">Fintech</option>
              </select>

              {/* Company Size */}
              <label htmlFor="companySize" className='mt-3 block font-semibold'>Company Size:</label>
              <select required  name="companySize" className='w-full p-2 bg-transparent outline-none border border-altBgColor rounded' id="">
                <option value="1 - 20">1 - 20</option>
                <option value="20 - 50">20 - 50</option>
                <option value="50 - 150">50 - 150</option>
                <option value="150 - 500">150 - 500</option>
                <option value="500+">500+</option>
              </select>

            </section>
            <section className='w-1/2 max-md:w-full'>
              {/* Company Name */}
              <label className='text-lg' htmlFor="companyName">Company Name:</label>
              <input type="text" id="companyName" name='companyName' className="mb-2 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 p-2" placeholder="Company Name" required />
              
              {/* Telephone */}
              <label className='text-lg' htmlFor="telephone">Telephone:</label>
              <input type="tel" id="telephone" name='telephone' className="mb-2 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 p-2" placeholder="Company Telephone" required />
              
              {/* Business ID */}
              <label className='text-lg' htmlFor="businessId">Business ID:</label>
              <input type="text" id="businessId" name='businessId' className="mb-2 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 p-2" placeholder="Business ID here" required />

              {/* Business Certificate */}
              <label className='text-lg' htmlFor="businessCert">Business certificate:</label>
              <input type="file" accept='application/pdf' id="businessCert" name='businessCert' className="standard-file-input" placeholder="Upload certificate here" required />
            </section>
          </div>
          <div className='mt-2 flex justify-end'>
            <Button type="submit" classname="">
              Continue
              <FaChevronRight />
            </Button>
          </div>
        </Form>
  )
}

export default CompanyOnboardingForm
