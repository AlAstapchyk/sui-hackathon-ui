'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownOption {
    id: string;
    label: string;
}

interface AnimatedDropdownProps {
    options: DropdownOption[];
    value: string | null;
    onChange: (value: string | null) => void;
    placeholder: string;
    icon?: ReactNode;
    activeColor?: 'cyan' | 'purple' | 'emerald';
    allOptionId?: string;
}

const colorClasses = {
    cyan: {
        active: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        option: 'bg-cyan-500/20 text-cyan-400',
    },
    purple: {
        active: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        option: 'bg-purple-500/20 text-purple-400',
    },
    emerald: {
        active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        option: 'bg-emerald-500/20 text-emerald-400',
    },
};

export default function AnimatedDropdown({
    options,
    value,
    onChange,
    placeholder,
    icon,
    activeColor = 'cyan',
    allOptionId = 'all',
}: AnimatedDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(o => o.id === value);
    const isActive = value && value !== allOptionId;
    const colors = colorClasses[activeColor];

    return (
        <div ref={ref} className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${isActive
                    ? `${colors.active} border`
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-slate-600'
                    }`}
            >
                {icon}
                <span>{isActive ? selectedOption?.label : placeholder}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 min-w-[12rem] p-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                        {options.map((option, index) => {
                            const isSelected = (option.id === allOptionId && !value) || option.id === value;
                            return (
                                <motion.button
                                    key={option.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => {
                                        onChange(option.id === allOptionId ? null : option.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-2 py-2 text-sm rounded-lg transition-colors cursor-pointer ${isSelected
                                        ? colors.option
                                        : 'text-slate-300 hover:bg-slate-700/50'
                                        }`}
                                >
                                    {option.label}
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
