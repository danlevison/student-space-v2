import React from 'react'

const About = () => {
  return (
    <section id="about" className="w-full flex items-center py-16 lg:py-52">
        <div className="max-w-[1440px] flex flex-col justify-center items-center mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-5xl text-center py-6 text-primaryTextClr">What is Student Space</h2>
            <p className="text-lg md:text-xl text-primaryTextClr leading-6">Welcome to Student Space, the ultimate platform designed specifically for primary school teachers by a passionate educator. As a primary school teacher, we understand the importance of an organised and efficient classroom environment that fosters student growth and success. That's why we created Student Space - your one-stop solution for seamless reward management and daily classroom management tools.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 w-full mt-6">
              <div className="shadow-xl rounded-xl hover:scale-105 ease-in duration-300 p-4 text-center bg-slate-100">
              <h2 className="text-xl font-bold underline capitalize">Reward management</h2>
                <p className="text-lg md:text-xl text-secondaryTextClr leading-6 px-4 py-6">We understand the powerful impact of positive reinforcement on student motivation and engagement. Our app empowers you to effortlessly manage rewards for your students, fostering a positive atmosphere that promotes their personal and academic growth. Whether it's points, stickers, or virtual badges, you can easily track and distribute rewards, ensuring that every achievement is acknowledged and celebrated.</p>
              </div>

              <div className="shadow-xl rounded-xl hover:scale-105 ease-in duration-300 p-4 text-center bg-slate-100">
                <h2 className="text-xl font-bold underline capitalize">Classroom managment</h2>
                <p className="text-lg md:text-xl text-secondaryTextClr leading-6 px-4 py-6">We believe that effective classroom management is key to nurturing a productive and inclusive learning environment. Our comprehensive suite of tools are designed to simplify your daily tasks, saving you valuable time and energy, allowing you to focus on what truly matters - your students' education.</p>
              </div>
              
              <div className="shadow-xl rounded-xl hover:scale-105 ease-in duration-300 p-4 text-center bg-slate-100">
              <h2 className="text-xl font-bold underline capitalize">User-friendly interface</h2>
                <p className="text-lg md:text-xl text-secondaryTextClr leading-6 px-4 py-6">Take advantage of intuitive features that make your teaching experience more enjoyable and efficient. Our user-friendly interface ensures that you can effortlessly navigate through the app, finding the tools you need with ease. We have thoughtfully designed Student Space to be accessible on various devices, giving you the freedom to manage your classroom anytime, anywhere.</p>
              </div>
            </div>
        </div>
    </section>
  )
}

export default About