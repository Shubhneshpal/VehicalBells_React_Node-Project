// contact form validation*******
export const validateForm = (formData) => {
    const errors = {};
    console.log(errors)  
    // Validate name
    if (formData.name.trim() === '') {
      errors.name = 'Name is required *';
    } 
    // Validate email
    if(formData.email.trim() === ''){
      errors.email = "Email is required *"
    }else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email address *';
    }    
    // Validate phone
    if (formData.phone.trim() === '') {
      errors.phone = 'Phone number is required *';
    }
    else if (!validatePhoneNumber(formData.phone)) {
      errors.phone = 'Invalid phone number. Please enter digits only*';
    }else if (!validatePhoneNumbers(formData.phone)){
      errors.phone = "10-digit numeric phone number is required*"
    }   
    // Validate massage
    if(formData.massage.trim() === ''){
      errors.massage = "Please fill the box 🥰"
    }else if(formData.massage.length >=30){
      errors.massage = "You can not write greater than 30 words *"
    }
   
    return errors;
  };
  

  
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  export const validatePhoneNumbers = (phone) => {
    const phonePattern = /^\d{10}$/; // Simple example: 10-digit numeric phone number
    return phonePattern.test(phone);
  };
  
  export const validatePhoneNumber = (phone) => {
    const phonePattern = /^[0-9]+$/; // Regular expression to allow only numbers  
    return phonePattern.test(phone);
  };

 


//  Register form validation******/////

  export const validateFormRegister = (RegformData) => {
    const errors = {};
  
    // Validate name
    if (!RegformData?.name?.trim()) {
      errors.name = 'Name is required *';
    }
  
    // Validate Last name
    if (!RegformData?.lname?.trim()) {
      errors.lname = 'Last Name is required *';
    }
  
    // Validate Company name
    if (!RegformData?.Cname?.trim()) {
      errors.Cname = 'Company Name is required *';
    }
  
    // Validate email
    if (!RegformData?.email?.trim()) {
      errors.email = 'Email is required *';
    } else if (!isValidEmail(RegformData.email)) {
      errors.email = 'Invalid email address *';
    }
  
    // Validate password
    if (!RegformData.password || !validatePassword(RegformData.password)) {
      errors.password = 'Minimum 8 characters & at least 1 letter & 1 number *';
    }  

  
    return errors;
  };

  export const validatePassword = (password) => {
    // Password validation logic
    // Example: Password must be at least 8 characters long and contain at least one letter and one number
    const hasCharacter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 8 && hasCharacter && hasNumber;
  };
  


//  Login form validation******/////

export const validateFormLogin = (loginData) => {
  const errors = {};

  // Validate email
  if (!loginData?.email?.trim()) {
    errors.email = 'Email is required *';
  } else if (!isValidEmail(loginData.email)) {
    errors.email = 'Invalid email address *';
  }
  // Validate password
  if (!loginData.password || !validatePassword(loginData.password)) {
    errors.password = 'Minimum 8 characters & at least 1 letter & 1 number *';
  }
  return errors;
};



// addVehicle page validation*******
export const addVehiclePageValidation = (VehicleData) => {
  const errors = {};
  console.log(errors)  
  // Validate name
  if (VehicleData.vType.trim() === '') {
    errors.vType = 'This input field is required **';
  } 
  // Validate email
  if(VehicleData.MCompany.trim() === ''){
    errors.MCompany = "This input field is required **"
  }   
  // Validate phone
  if (VehicleData.fType.trim() === '') {
    errors.fType = 'This input field is required **';
  }
  if (VehicleData.Modal.trim() === '') {
    errors.Modal = 'This input field is required **';
  }
  if (VehicleData.VRegistration.trim() === '') {
    errors.VRegistration = 'This input field is required **';
  }
  if (VehicleData.Avrage.trim() === '') {
    errors.Avrage = 'This input field is required **';
  }
  if (VehicleData.OReading.trim() === '') {
    errors.OReading = 'This input field is required **';
  }
  return errors;
};


// addTrip page validation*******
export const validateFormAddTrip = (TripformData) => {
  const errors = {};
  console.log(errors)  
  // Validate name
  if (TripformData.Tfrom.trim() === '') {
    errors.Tfrom = 'This input field is required **';
  } 
  // Validate email
  if(TripformData.Tend.trim() === ''){
    errors.Tend = "This input field is required **"
  }   
  // Validate phone
  if (TripformData.Cvehicle.trim() === '') {
    errors.Cvehicle = 'This input field is required **';
  }
  if (TripformData.Ttpye.trim() === '') {
    errors.Ttpye = 'This input field is required **';
  }
  if (TripformData.Note.trim() === '') {
    errors.Note = 'This input field is required **';
  }
  if (TripformData.Tag.trim() === '') {
    errors.Tag = 'This input field is required **';
  }
  return errors;
};



// addExpenses page validation*******
export const validateFormAddExpenses = (expensesData) => {
  const errors = {};
  console.log(errors)  
  if (expensesData.vType.trim() === '') {
    errors.vType = 'This input field is required **';
  }  
  if (expensesData.State.trim() === '') {
    errors.State = 'This input field is required **';
  }
  if (expensesData.fType.trim() === '') {
    errors.fType = 'This input field is required **';
  }
  if (expensesData.fprice.trim() === '') {
    errors.fprice = 'This input field is required **';
  }
  if (expensesData.Trip.trim() === '') {
    errors.Trip = 'This input field is required **';
  }
  if (expensesData.Distance.trim() === '') {
    errors.Distance = 'This input field is required **';
  }
  if (expensesData.vAverage.trim() === '') {
    errors.vAverage = 'This input field is required **';
  }
  if (expensesData.vRegistration.trim() === '') {
    errors.vRegistration = 'This input field is required **';
  }
  if (expensesData.Notes.trim() === '') {
    errors.Notes = 'This input field is required **';
  }
  return errors;
};
// TeamvalidateForm page validation*******
export const TeamvalidateForm = (TeamData) => {
  const errors = {};
  console.log(errors)  
  if (TeamData.TeamName.trim() === '') {
    errors.TeamName = '';
  } 
    // Validate email
    if (!TeamData?.Eadress?.trim()) {
      errors.Eadress = 'Email is required *';
    } else if (!isValidEmail(TeamData.Eadress)) {
      errors.Eadress = 'Invailid email *';
    } 
  
  return errors;
};

// changePassword page validation*******
export const changePassword = (ChangePass) => {
  const errors = {};
  console.log(errors)  
  if (ChangePass.password.trim() === '') {
    errors.password = 'Old Password is required **';
  }  
  if (ChangePass.NewPass.trim() === '') {
    errors.NewPass = 'New Password is required **';
  }
  if (ChangePass.ConPass.trim() === '') {
    errors.ConPass = 'Confirm Password is required **';
  }
  
  return errors;
};