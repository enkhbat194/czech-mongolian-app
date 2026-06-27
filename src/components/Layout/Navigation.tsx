import React from 'react';
import { motion } from 'framer-motion';
import { Home, Map, Dumbbell, BarChart2, Settings } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

const NAV = [
  { id:'home',     icon:Home,     label:'Нүүр'    },
  { id:'path',     icon:Map,      label:'Зам'     },
  { id:'practice', icon:Dumbbell, label:'Дасгал'  },
  { id:'progress', icon:BarChart2,label:'Ахиц'    },
  { id:'settings', icon:Settings, label:'Тохиргоо'},
];

export const Sidebar: React.FC = () => null;

export const BottomNav: React.FC = () => {
  const { currentPage, setPage } = useAppStore();

  return (
    <div
      style={{
        position:'fixed', bottom:0,
        left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:430, zIndex:100,
        background:'#141416',
        borderTop:'1px solid #2A2A2F',
        paddingBottom:'env(safe-area-inset-bottom,6px)',
      }}
    >
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-around', padding:'8px 4px 4px' }}>
        {NAV.map(n => {
          const Icon = n.icon;
          const active = currentPage === n.id;
          return (
            <motion.button
              key={n.id}
              whileTap={{ scale:.85 }}
              onClick={() => setPage(n.id)}
              style={{
                display:'flex', flexDirection:'column', alignItems:'center',
                gap:3, padding:'6px 12px', borderRadius:14,
                background:'transparent', border:'none', cursor:'pointer',
                minWidth:56,
              }}
            >
              <div style={{
                width:38, height:38, borderRadius:12,
                display:'flex', alignItems:'center', justifyContent:'center',
                background: active ? 'rgba(200,149,42,.18)' : 'transparent',
                transition:'background .2s',
              }}>
                <Icon
                  size={20}
                  color={active ? '#C8952A' : '#606068'}
                  strokeWidth={active ? 2.5 : 1.8}
                />
              </div>
              <span style={{
                fontSize:10, fontWeight:700,
                color: active ? '#C8952A' : '#606068',
              }}>
                {n.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
