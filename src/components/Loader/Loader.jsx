import { Oval } from 'react-loader-spinner';

export const Loader = ({ showLoader }) => {
   return (
      <Oval
         height={60}
         width={60}
         color="#5c91b1"
         wrapperStyle={{ marginTop: '20px', }}
         visible={showLoader}
         ariaLabel='oval-loading'
         secondaryColor="#d0d7dd"
         strokeWidth={8}
         strokeWidthSecondary={8}
      />
   );
};