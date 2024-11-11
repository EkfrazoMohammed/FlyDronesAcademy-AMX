// // src/components/Modal.js
// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 min-w-96">
//       <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative max-h-[620px] md:max-h-[580px] overflow-y-auto m-1 md:m-0">
//         {/* Close Icon */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;

import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 min-w-96">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative max-h-[620px] md:max-h-[580px] overflow-y-auto m-1 md:m-0">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

// PropTypes validation
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Expecting a boolean for open/close state
  onClose: PropTypes.func.isRequired, // Expecting a function for closing the modal
  children: PropTypes.node.isRequired, // Expecting node elements (children)
};

export default Modal;
