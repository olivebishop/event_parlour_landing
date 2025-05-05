"use client"



/**
           * Renders a responsive section displaying three key statistics with descriptive labels.
           *
           * The section features a three-column grid layout, each column highlighting a different statistic: reduction in manual tasks, increase in productivity, and events successfully hosted. Styling and layout adapt for various screen sizes using Tailwind CSS classes.
           */
          export default function StatsSection() {
  return (
    <div className="w-full mt-auto  border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-3 gap-4">
            {/* Stat 1 */}
            <div className="text-center md:text-left border-r border-white/10 pr-4">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">95%</h3>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                Reduction in
                <br className="hidden sm:block" />
                manual tasks
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center md:text-left border-r border-white/10 px-4">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">40%</h3>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                Increase in
                <br className="hidden sm:block" />
                productivity
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center md:text-left pl-4">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">1M+</h3>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                Events
                <br className="hidden sm:block" />
                successfully hosted
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
            );
          }
