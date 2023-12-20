'use client'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import AllRecharges from '@/app/components/Admin/Recharge/AllRecharges';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
     
        <Heading
          title="Elearning - Withdrawl"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllRecharges />
          </div>
        </div>
     
    </div>
  )
}

export default page