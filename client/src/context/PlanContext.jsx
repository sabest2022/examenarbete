import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// Assuming Plan is a similar structure to Product


const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };
  const createPlan = async (newPlan) => {
    try {
      await axios.post('/api/plans', newPlan);
      fetchPlans(); // Fetch the updated list of plans
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };
  const removePlan = async (planId) => {
    try {
      await axios.delete(`/api/plans/${planId}`);
      fetchPlans(); // Fetch the updated list of plans
    } catch (error) {
      console.error('Error removing plan:', error);
    }
  };
  const updatePlan = async (planId, updatedValues) => {
    try {
      await axios.put(`/api/plans/${planId}`, updatedValues);
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
      createPlan,
      removePlan,
      updatePlan
    }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => useContext(PlanContext)
