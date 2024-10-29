import React from 'react'
import { Collapse } from 'antd';
const FAQ = () => {
  
  const items = [
    {
      key: '1',
      label: 'What does FlyDro do ?',
      children:<span className='bg-transparent text-[1.1rem] justify-inter-word'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit cupiditate eos ut quos numquam tempore consequatur obcaecati exercitationem deleniti architecto aspernatur doloribus voluptate eum praesentium officiis asperiores facere aut modi, nam ea perferendis. Voluptatum voluptates laudantium amet officiis animi ex! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat quaerat quia, laudantium rem cum non, voluptatum earum hic facilis officia consequuntur eveniet. Ex, veritatis ratione optio quas laudantium cumque dolore. Quos recusandae saepe molestiae inventore impedit autem eveniet deleniti quis.</span>,
    },
    {
      key: '2',
      label: 'What does FlyDro do ?',
      children:<span className='bg-transparent text-[1.1rem]'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit dolorum doloribus magnam debitis, dignissimos eligendi itaque consequatur, quam a excepturi assumenda dolores, minima fugit nostrum facilis nisi. Nostrum aperiam, incidunt facere quae placeat quia, tempore ut quod quisquam quas nam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat quaerat quia, laudantium rem cum non, voluptatum earum hic facilis officia consequuntur eveniet. Ex, veritatis ratione optio quas laudantium cumque dolore. Quos recusandae saepe molestiae inventore impedit autem eveniet deleniti quis.</span>,
 
   
    },
    {
      key: '3',
      label: 'What does FlyDro do ?',
      children:<span className='bg-transparent text-[1.1rem]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore perferendis laborum facilis et veritatis deleniti non! Eligendi, voluptatem possimus. Architecto optio repudiandae aliquam dolores necessitatibus, asperiores veniam molestias laboriosam fugiat inventore sed ipsam et voluptate, impedit assumenda, rem ex esse. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat quaerat quia, laudantium rem cum non, voluptatum earum hic facilis officia consequuntur eveniet. Ex, veritatis ratione optio quas laudantium cumque dolore. Quos recusandae saepe molestiae inventore impedit autem eveniet deleniti quis.</span>,
 
    },
    {
        key: '4',
        label: 'What does FlyDro do ?',
        children:<span className='bg-transparent text-[1.1rem]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit cupiditate eos ut quos numquam tempore consequatur obcaecati exercitationem deleniti architecto aspernatur doloribus voluptate eum praesentium officiis asperiores facere aut modi, nam ea perferendis. Voluptatum voluptates laudantium amet officiis animi ex! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat quaerat quia, laudantium rem cum non, voluptatum earum hic facilis officia consequuntur eveniet. Ex, veritatis ratione optio quas laudantium cumque dolore. Quos recusandae saepe molestiae inventore impedit autem eveniet deleniti quis.</span>,
      },
      {
        key: '5',
        label: 'What does FlyDro do ?',
        children:<span className='bg-transparent text-[1.1rem] justify-inter-word'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit dolorum doloribus magnam debitis, dignissimos eligendi itaque consequatur, quam a excepturi assumenda dolores, minima fugit nostrum facilis nisi. Nostrum aperiam, incidunt facere quae placeat quia, tempore ut quod quisquam quas nam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat quaerat quia, laudantium rem cum non, voluptatum earum hic facilis officia consequuntur eveniet. Ex, veritatis ratione optio quas laudantium cumque dolore. Quos recusandae saepe molestiae inventore impedit autem eveniet deleniti quis.</span>,
   
     
      },
      {
        key: '6',
        label: 'What does FlyDro do ?',
        children:<span className='bg-transparent text-[1.1rem] justify-inter-word' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit cupiditate eos ut quos numquam tempore consequatur obcaecati exercitationem deleniti architecto aspernatur doloribus voluptate eum praesentium officiis asperiores facere aut modi, nam ea perferendis. Voluptatum voluptates laudantium amet officiis animi ex! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat quaerat quia, laudantium rem cum non, voluptatum earum hic facilis officia consequuntur eveniet. Ex, veritatis ratione optio quas laudantium cumque dolore. Quos recusandae saepe molestiae inventore impedit autem eveniet deleniti quis.</span>,
   
      },
  ];
    const onChange = (key) => {
        console.log(key);
      };
  return (
    <div className=' text-primaryColor md:min-h-[50vh]'>
 <div className='w-full flex flex-col m-0 text-center items-center justify-center'>
        <div className="heading p-2 text-[2rem] flex justify-center items-center text-center m-0 bg-white w-full">FAQ</div>

        <div className='w-full min-h-full md:min-h-[50vh]'
         style={{
          background: "linear-gradient(to right, #f8da5a 50%, rgba(244, 227, 59, 0)), url('https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/vector_01.JPG')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundAttachment: 'fixed', // This will make the background image remain fixed
        }}
          >
          <div className="paragraphs py-4 px-4 md:py-6 md:px-10 text-[1.5rem] text-left w-full flex items-center justify-center " >

          <div className='max-w-[1280px] w-full'>
          <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
          </div>
          </div>
        </div>
        </div>

    </div>
  )
}

export default FAQ;