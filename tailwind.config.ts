import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
	  "./pages/**/*.{ts,tsx}",
	  "./components/**/*.{ts,tsx}",
	  "./app/**/*.{ts,tsx}",
	  "./src/**/*.{ts,tsx}",
	  "*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	screens: {
    		'xs': '475px',
    		'sm': '640px',
    		'md': '768px',
    		'lg': '1024px',
    		'xl': '1280px',
    		'2xl': '1536px',
    	},
    	extend: {
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			gradient: {
    				to: {
    					backgroundPosition: 'var(--bg-size) 0'
    				}
    			},
    			'shimmer-slide': {
    				to: {
    					transform: 'translate(calc(100cqw - 100%), 0)'
    				}
    			},
    			'spin-around': {
    				'0%': {
    					transform: 'translateZ(0) rotate(0)'
    				},
    				'15%, 35%': {
    					transform: 'translateZ(0) rotate(90deg)'
    				},
    				'65%, 85%': {
    					transform: 'translateZ(0) rotate(270deg)'
    				},
    				'100%': {
    					transform: 'translateZ(0) rotate(360deg)'
    				}
    			},
                // Loader animations start here
                'spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                },
                'spin-reverse': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-360deg)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0) rotateY(0deg)' },
                    '50%': { transform: 'translateY(-10px) rotateY(180deg)' }
                },
                'dots': {
                    '0%, 20%': { content: "''" },
                    '40%': { content: "'.'" },
                    '60%': { content: "'..'" },
                    '80%, 100%': { content: "'...'" }
                },
                'sparkle': {
                    '0%': { transform: 'scale(0)', opacity: '0' },
                    '50%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(0)', opacity: '0' }
                },
                // Horizontal marquee for testimonials
                'hrtl-scroll': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' }
                },
                'hrtl-scroll-reverse': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' }
                }
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			gradient: 'gradient 8s linear infinite',
    			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
    			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
                // Loader animations start here
                'spin': 'spin 2s linear infinite',
                'spin-reverse': 'spin-reverse 3s linear infinite',
                'float': 'float 2s ease-in-out infinite',
                'dots': 'dots 1.5s infinite',
                'sparkle': 'sparkle 2s ease-in-out infinite',
                'delay-300': 'sparkle 2s ease-in-out 300ms infinite',
                'delay-700': 'sparkle 2s ease-in-out 700ms infinite',
                'delay-1000': 'sparkle 2s ease-in-out 1000ms infinite',
                'delay-1500': 'sparkle 2s ease-in-out 1500ms infinite',
                // Horizontal marquee for testimonials
                'hrtl-scroll': 'hrtl-scroll linear infinite',
                'hrtl-scroll-reverse': 'hrtl-scroll-reverse linear infinite'
    		},
            perspective: {
                'none': 'none',
                '800': '800px'
            }
    	}
    },
	plugins: [require("tailwindcss-animate")],
};

export default config;