import React from "react";

const Features = () => {
  const featureList = [
    {
      title: "Rapid Response",
      desc: "Our live emergency broadcast system alerts donors in your district within seconds of your request.",
      icon: "⚡",
      img: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&q=80&w=400",
      color: "from-[#ed4f00] to-[#ff9215]",
    },
    {
      title: "Donor Tracking",
      desc: "Real-time updates on your request status. See exactly when a hero is on the way to help.",
      icon: "📍",
      img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400",
      color: "from-[#ff9215] to-[#ffbc15]",
    },
    {
      title: "Smart Matching",
      desc: "Our algorithm matches blood groups and location to find the perfect donor nearest to the hospital.",
      icon: "🧬",
      img: "https://www.shutterstock.com/image-photo/blood-sample-tube-cross-matching-260nw-2635352339.jpg",
      color: "from-[#ed4f00] to-[#9e3500]",
    },
  ];

  return (
    <section className="py-5 lg:py-20 px-4 lg:px-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-7 lg:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
            Advanced <span className="bg-clip-text text-transparent bg-linear-to-tr from-[#ed4f00] to-[#ffbc15]">Saving</span> Features
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-[#ff9215] to-transparent mx-auto"></div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#ff9215]/40"
            >
              {/* Image Layer with Overlay */}
              <div className="absolute inset-0 z-0">
                <img src={feature.img} alt={feature.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent"></div>
              </div>

              {/* Live Border Trace Animation */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ff9215_50%,transparent_100%)] opacity-20"></div>
              </div>

              {/* Content Layer */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-lg bg-linear-to-tr ${feature.color} animate-pulse`}>{feature.icon}</div>

                <h3 className="text-2xl font-black italic uppercase text-white mb-3 tracking-tight">{feature.title}</h3>

                <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium">{feature.desc}</p>

                {/* Animated Call to Action */}
                <div className="flex items-center gap-2 text-[#ff9215] font-black text-xs uppercase tracking-widest group/link cursor-pointer">
                  <span>Learn More</span>
                  <span className="w-8 h-[2px] bg-[#ff9215] transition-all group-hover/link:w-12"></span>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#ed4f00] blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
