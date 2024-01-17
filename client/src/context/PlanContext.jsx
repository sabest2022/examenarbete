import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// Assuming Plan is a similar structure to Product


const PlanContext = createContext({
  plans: [],
  fetchPlans: () => { },
  getPlan: () => { },
  createPlan: () => { },
  removePlan: () => { },
  updatePlan: () => { },
  // Add loading and error states as needed
});

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/plans');
      setPlans(response.data);
      // console.log(response.data); // Check the fetched data
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };
  const getPlan = async (planId) => {

    try {
      const response = await axios.get(`http://localhost:3000/api/plans/${planId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching plan:', error);
      return null; // Instead of throwing, we handle the error by returning null
    }
  };


  const createPlan = async (newPlan) => {
    try {
      await axios.post('http://localhost:3000/api/plans', newPlan);
      fetchPlans(); // Fetch the updated list of plans
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };
  const removePlan = async (planId) => {
    try {
      await axios.delete(`http://localhost:3000/api/plans/${planId}`);
      fetchPlans(); // Fetch the updated list of plans
    } catch (error) {
      console.error('Error removing plan:', error);
    }
  };
  const updatePlan = async (planId, updatedValues) => {
    try {
      await axios.put(`http://localhost:3000/api/plans/${planId}`, updatedValues);
      fetchPlans(); // Fetch the updated list of plans
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };



  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <PlanContext.Provider value={{
      plans,
      fetchPlans,
      getPlan,
      createPlan,
      removePlan,
      updatePlan
    }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => useContext(PlanContext)
