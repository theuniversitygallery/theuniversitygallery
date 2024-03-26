import Button from './Button'
import { FaChevronRight } from 'react-icons/fa'
import { Form } from 'react-router-dom'

const CompanyOnboardingForm = ({userId, userType}) => {

  return (
    <Form method='post'>
          <input type="text" defaultValue={userId} className='hidden' name='userId' />
          <input type="text" defaultValue={userType} className='hidden' name='userType' />
          <div className='flex gap-4 max-md:flex-col'>
            <section className='w-1/2 max-md:w-full'>
              {/* School Name */}
              <label htmlFor="schoolName" className='block font-semibold'>School Name:</label>
              <select required name="schoolName" className='w-full p-2 bg-transparent outline-none border border-altBgColor rounded' id="">
                <option value="ATU">ATU</option>
                <option value="KTU">KTU</option>
                <option value="KNUST">KNUST</option>
                <option value="UPSA">UPSA</option>
              </select>

              {/* Programme */}
              <label htmlFor="programme" className='mt-3 block font-semibold'>Programme:</label>
              <select required name="programme" className='w-full p-2 bg-transparent outline-none border border-altBgColor rounded' id="">
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Fashion">Fashion</option>
                <option value="Sec & Management">Sec & Management</option>
              </select>

            </section>
            <section className='w-1/2 max-md:w-full'>
              {/* Level / Year started */}
              <div className='flex gap-4'>
                <section className='w-1/2'>
                  <label htmlFor="level" className='block font-semibold'>Level:</label>
                  <select required name="level" className='w-full p-2 bg-transparent outline-none border border-altBgColor rounded' id="">
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="Final Year">Final Year</option>
                    <option value="Completed">Completed</option>
                  </select>
                </section>
                <section className='w-1/2'>
                  <label htmlFor="startYear" className='block font-semibold'>Year Started:</label>
                  <input type="number" min="2000" id="startYear" name='startYear' className="mb-2 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 px-2 py-1" placeholder="Start year" required />
                </section>
              </div>
              
              {/* Student ID */}
              <label className='text-lg' htmlFor="studentId">Student ID:</label>
              <input type="text" id="studentId" name='studentId' className="mb-2 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-50 block w-full ps-4 px-2 py-1" placeholder="Student ID here" required />
            </section>
          </div>
          <h2 htmlFor="interest" className='mt-4 block font-semibold'>What are you interested in? Select at least one</h2>
          <div className='w-full mt-2 flex flex-wrap gap-3'>
            {/* Fields of interest */}
            <label className="cursor-pointer">
                <input type="checkbox" value="Art" className="sr-only peer" />
                <div className="min-w-20 px-2 rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                    Art
                </div>
            </label>
            <label className="cursor-pointer">
                <input type="checkbox" value="Fashion" className="sr-only peer" />
                <div className="min-w-20 px-2 rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                    Fashion
                </div>
            </label>
            <label className="cursor-pointer">
                <input type="checkbox" value="Finance" className="sr-only peer" />
                <div className="min-w-20 px-2 rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                    Finance
                </div>
            </label>
            <label className="cursor-pointer">
                <input type="checkbox" value="Job offers" className="sr-only peer" />
                <div className="min-w-20 px-2 rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                    Job offers
                </div>
            </label>
            <label className="cursor-pointer">
                <input type="checkbox" value="UPSA" className="sr-only peer" />
                <div className="min-w-20 px-2 rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                    UPSA
                </div>
            </label>
            <label className="cursor-pointer">
                <input type="checkbox" value="Student Life" className="sr-only peer" />
                <div className="min-w-20 px-2 rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                    Student Life
                </div>
            </label>
            <label className="cursor-pointer">
                <input type="checkbox" value="KTU" className="sr-only peer" />
                <div className="min-w-20 px-2 rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                    KTU
                </div>
            </label>
            <label className="cursor-pointer">
                <input type="checkbox" value="ATU" className="sr-only peer" />
                <div className="min-w-20 px-2 rounded-md border text-center border-altBgColor hover:bg-altBgColor hover:text-altTextColor transition duration-200 ease-in-out peer-checked:bg-altBgColor peer-checked:text-altTextColor">
                    ATU
                </div>
            </label>
          </div>
          <p className='mt-3 text-sm'><span className='font-bold'>Notice:</span> This app will need to accesss your location to provide its services.</p>
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
