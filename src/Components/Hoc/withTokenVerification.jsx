// import { useEffect } from 'react';
// import { useAuth } from '../../Contexts/authContext';

// export const WithTokenVerification = (WrappedComponent) => {
//   const TokenVerificationWrapper = (props) => {
//     const { setToken, setUser, token } = useAuth();

//     useEffect(() => {

//       const verifyToken = async () => {
//         try {
//           const response = await fetch(
//             `${process.env.REACT_APP_API_BASE_URL}/auth/verifyToken`,
//             {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ token }),
//             }
//           );

//           const verificationResult = await response.json();
//           if (!!verificationResult?.userDetails) {
//             console.log('Token verified successfully');
//           }else{
//             console.error('Token verification failed, please login again');
//             setToken('');
//           }
//         } catch (error) {
//           console.error('Token verification error:', error);
//           setToken('');
//         }
//       };

//       verifyToken();
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return user ? <WrappedComponent {...props} /> : null;
//   };

//   return TokenVerificationWrapper;
// };
