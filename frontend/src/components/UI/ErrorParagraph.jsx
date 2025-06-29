
const ErrorParagraph = ({ error }) => {
  return (
    <p className='my-paragraph'>{error.message}</p>
  );
}


export default ErrorParagraph;