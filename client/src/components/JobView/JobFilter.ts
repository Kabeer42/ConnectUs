export const filterJobByDate = (items:any, days: number)=>{
    const now = new Date();
    const filteredItems = items.filter((item:any) => {
      const differenceInTime = now.getTime() - new Date(item.updatedAt).getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24); // convert time to days
      return differenceInDays <= days;
    });
    return filteredItems;
  }

export const filterJobByLocation = (items: any, location: string) => {
    if (location === "All") {
      return items;
    }
    if(location === "Lahore"){
     location = "Lahore, Punjab, Pakistan"
    }else if(location === "Karachi"){
     location = "Karachi, Sindh, Pakistan"
    }else if(location === "Islamabad"){
     location = "Islamabad Capital Territory, Pakistan"
    }else if(location === "Peshawar"){
     location = "Peshawar, Khyber Pakhtunkhwa, Pakistan"
    }else if(location === "Faisalabad"){
     location = "Faisalabad, Punjab, Pakistan"
    }


    return items.filter((item:any) => item.Job_location === location);
  };

  export const filterJobByWorkType = (items: any, workType: string) => {    
    if (workType === "All") {
      return items;
    }
    
    return items.filter((item:any) => item.Workplace_type === workType);
  }
  export const filterJobByJobType = (items: any, jobType: string) => {
    if (jobType === "All") {
        return items;
      }
      
      return items.filter((item:any) => item.Job_type === jobType);
  }