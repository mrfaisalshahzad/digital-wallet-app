import React, { useState, useEffect, useRef } from 'react';
import './CustomDatePicker.css';

const PickerWheel = ({ items, selected, onChange }) => {
  const scrollRef = useRef(null);
  const ITEM_HEIGHT = 40; // px
  
  const isScrolling = useRef(false);

  useEffect(() => {
     if (scrollRef.current && !isScrolling.current) {
        const timeout = setTimeout(() => {
           if (scrollRef.current && !isScrolling.current) {
              const index = items.indexOf(selected);
              if (index !== -1) {
                 scrollRef.current.scrollTop = index * ITEM_HEIGHT;
              }
           }
        }, 50);
        return () => clearTimeout(timeout);
     }
  }, [items, selected]);

  const handleScroll = (e) => {
     isScrolling.current = true;
     clearTimeout(scrollRef.current.timeout);
     scrollRef.current.timeout = setTimeout(() => {
        isScrolling.current = false;
        const index = Math.round(e.target.scrollTop / ITEM_HEIGHT);
        if (items[index] !== undefined && items[index] !== selected) {
           onChange(items[index]);
        }
     }, 150);
  };

  return (
    <div className="picker-wheel" ref={scrollRef} onScroll={handleScroll}>
      <div className="picker-wheel-pad"></div>
      {items.map((item, i) => (
         <div key={i} className={`picker-item ${item === selected ? 'selected' : ''}`}>
            {item}
         </div>
      ))}
      <div className="picker-wheel-pad"></div>
    </div>
  )
};

const CustomDatePicker = ({ value, onChange, onClose }) => {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2000);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = Array.from({length: 31}, (_, i) => i + 1);
  const years = Array.from({length: 100}, (_, i) => new Date().getFullYear() - 99 + i);

  useEffect(() => {
    if (value) {
       const d = new Date(value);
       if (!isNaN(d.getTime())) {
         setDay(d.getDate());
         setMonth(d.getMonth());
         setYear(d.getFullYear());
       }
    }
  }, [value]);

  const handleDone = () => {
     const m = String(month + 1).padStart(2, '0');
     const d = String(day).padStart(2, '0');
     onChange(`${year}-${m}-${d}`);
     onClose();
  };

  return (
    <div className="custom-datepicker-overlay">
      <div className="custom-datepicker-sheet">
        <div className="custom-datepicker-header">
           <button onClick={onClose} className="cancel-btn">Cancel</button>
           <button onClick={handleDone} className="done-btn text-accent">Done</button>
        </div>
        <div className="custom-datepicker-wheels">
           <div className="picker-selection-overlay pointer-events-none"></div>
           <PickerWheel items={days} selected={day} onChange={setDay} />
           <PickerWheel items={months} selected={months[month]} onChange={(v) => setMonth(months.indexOf(v))} />
           <PickerWheel items={years} selected={year} onChange={setYear} />
        </div>
      </div>
    </div>
  )
};

export default CustomDatePicker;
