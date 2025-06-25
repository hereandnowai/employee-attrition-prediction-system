
import React, { useState, useMemo } from 'react';
import { type Employee } from '../types';
import { EmployeeCard } from './EmployeeCard';
import { MOCK_EMPLOYEES } from '../constants';
import { SearchIcon, FilterIcon } from './icons';

interface DashboardPageProps {
  onSelectEmployee: (employee: Employee) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onSelectEmployee }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const departments = useMemo(() => {
    const allDepartments = MOCK_EMPLOYEES.map(emp => emp.department);
    return ['All', ...Array.from(new Set(allDepartments))];
  }, []);

  const filteredEmployees = useMemo(() => {
    return MOCK_EMPLOYEES.filter(employee => {
      const nameMatch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
      const departmentMatch = departmentFilter === 'All' || departmentFilter === '' || employee.department === departmentFilter;
      return nameMatch && departmentMatch;
    });
  }, [searchTerm, departmentFilter]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold text-[var(--text-color-primary)] mb-2">Employee Attrition Dashboard</h2>
        <p className="text-[var(--text-color-secondary)]">Monitor employee attrition risk and take proactive measures.</p>
      </div>

      <div className="p-6 bg-[var(--brand-bg-surface-alt)] border border-[var(--brand-border-color)] rounded-xl shadow-2xl space-y-4 md:flex md:items-center md:justify-between md:space-y-0">
        <div className="relative flex-grow md:max-w-md">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-3 bg-[var(--brand-bg-surface)] text-[var(--text-color-primary)] border border-[var(--brand-border-color-alt)] rounded-lg focus:ring-2 focus:ring-[var(--brand-focus-ring)] focus:border-[var(--brand-focus-ring)] transition-shadow placeholder-[var(--text-color-muted)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="h-5 w-5 text-[var(--text-color-muted)] absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="relative md:max-w-xs flex-grow md:ml-4 mt-4 md:mt-0">
           <select
            className="w-full pl-10 pr-4 py-3 bg-[var(--brand-bg-surface)] text-[var(--text-color-primary)] border border-[var(--brand-border-color-alt)] rounded-lg focus:ring-2 focus:ring-[var(--brand-focus-ring)] focus:border-[var(--brand-focus-ring)] appearance-none transition-shadow placeholder-[var(--text-color-muted)]"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
            ))}
          </select>
          <FilterIcon className="h-5 w-5 text-[var(--text-color-muted)] absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} onSelectEmployee={onSelectEmployee} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <img src="https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/caramel-face.jpeg" alt="No results - Caramel Face" className="w-32 h-32 mx-auto mb-4 rounded-full opacity-75" />
          <p className="text-xl text-[var(--text-color-muted)]">No employees found matching your criteria.</p>
          <p className="text-sm text-[var(--text-color-muted)] opacity-75 mt-1">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
};
