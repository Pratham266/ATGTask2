import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import React, { useEffect, useState } from "react";
import Loader from './Component/Loader'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [userProfile, setUserProfile] = useState({
    id:"",
    imgUrl:"",
    username:"",
    email:"",
    bio:"",
    firstname:"",
    lastname:"",
    jobtitle:"",
  });
 
  const handleUserProfile = (user)=>{
    setUserProfile({
      id:user.id,
      imgUrl: user.id<11 ? "/user.png":user.avatar,
      username:user.profile.username,
      email:user.profile.email,
      bio:user.Bio,
      firstname:user.profile.firstName,
      lastname:user.profile.lastName,
      jobtitle:user.jobTitle,
    })
    setSelectedEmail(user.profile.email);

  }
  let cnt = 0;
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
      const data = await response.json();
      setUsers(data);
      // console.log("users",users);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (users.length) {
    return (
      <>
      <Head>
      <title>API Task 2</title>
      </Head>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-12 gap-4 p-1">
          <div className="header flex justify-center items-center col-span-12 rounded-lg  py-8 ">
<p className="text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Employee Data <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">ATG</mark> Task 2</p>

          </div>
          <div className="col-span-12 rounded-lg  sm:col-span-5">
            {/* <!-- Main Content --> */}

            <div className="flex justify-center items-center mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  USER LIST
                </h3>
              </div>
            <div className="p-4 max-w-md bg-white  shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flow-root overflow-y-auto h-[30rem]">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  
                  {
                    users.length===0?<> <li className="py-3 sm:py-4"><div className="flex-1 min-w-0">
                      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                        User Not found
                      </p></div></li></>:<>
                      
                      {users.map((user) => (
                    <React.Fragment key={cnt++} >
                      <li className={`py-3 sm:py-4 cursor-pointer ${user.profile.email === selectedEmail ? "bg-blue-200" : ""}`} onClick={() => handleUserProfile(user)}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Image
                              className="rounded-full"
                              height={50}
                              width={50}
                              src={cnt < 10 ? "/user.png" : user.avatar}
                              alt={user.profile.firstName}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {user.profile.firstName} {user.profile.lastName}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {user.profile.email}
                            </p>
                          </div>
                        </div>
                      </li>
                    </React.Fragment>
                  ))}

                      </>
                  }

                 
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-12  sm:col-span-7">
            {/* <!-- Sidebar --> */}
            <div className="flex justify-center items-center mb-6">
              <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                USER DETAILS
              </h3>
            </div>
            <div className="mx-6">
              {
               userProfile.username === ""?
               <>
              <div className="text-center p-6 bg-gray-800 border-b">
               <h1 className="pt-2 text-lg  text-gray-50">Please select user to see their profile!</h1>
               </div>
               </>
               :
               <>
               <div className="bg-white rounded overflow-hidden shadow-lg">
                <div className="text-center p-6 bg-gray-800 border-b">
                  <div className="item-center justify-center flex">
                  <Image
                  className="rounded-full"
                  height={100}
                  width={100}
                  alt={userProfile.firstname}
                  src={userProfile.imgUrl}
                />
                </div>
                  <p className="pt-2 text-lg font-semibold text-gray-50">
                    {userProfile.username}
                  </p>
                  <p className="text-lg text-gray-100">{userProfile.email}</p>
                  <div className="mt-5">
                    <div className="border py-2 px-4 text-sm  text-gray-100">
                     {userProfile.bio}
                    </div>
                  </div>
                </div>
                <div className="border-b">
                  <div>
                    <div className="px-6 py-4 hover:bg-gray-100 flex">
                      <div className="text-green-600">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className="pl-3">
                      <p className="text-sm text-gray-500">Full Name</p>
                        <p className="text-lg font-medium text-gray-800 leading-none">
                          {userProfile.firstname} {userProfile.lastname}
                        </p>
                       
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="px-6 py-4 hover:bg-gray-100 flex">
                      <div className="text-green-600">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className="pl-3">
                        <p className="text-sm text-gray-500">Job Title</p>
                        <p className="text-lg font-medium text-gray-800 leading-none">
                        {userProfile.jobtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               </>
              }
              
            </div>
          </div>
        </div>
      </>
    );
  } 
  else {
    return (<>
      <Loader/>
    </>);
  }
}