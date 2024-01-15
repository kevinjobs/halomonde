import { useEffect, } from 'react';
import { useNavigate, } from 'react-router-dom';

export default function Redirect({to}: {to: string}) :null {
  const navigate = useNavigate();
  useEffect(() => navigate(to), []);
  return null;
}
