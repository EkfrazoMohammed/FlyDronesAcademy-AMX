
import Accordion from '../utils/Accordion';
const FAQ = () => {
  const faqs = [
    {
      question: "What are the advantages of your service?",
      answer: "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      question: "Are there any fees or commissions in addition to the monthly subscription?",
      answer: "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      question: "You really don't charge per user? Why not?",
      answer: "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      question: "What happens when I go over my monthly active limit?",
      answer: "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      question: "Can your service help me understand how to work with my product?",
      answer: "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
    {
      question: "Which third-party application do you integrate with?",
      answer: "If you go over your organisations or user limit, a member of the team will reach out about bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users that are over the 100-account or 1,000-user limit.",
    },
   
  ];
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
            <Accordion faqs={faqs} />
          </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default FAQ;