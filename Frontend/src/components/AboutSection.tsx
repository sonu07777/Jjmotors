import { Building2, Users, Target, Award } from 'lucide-react';

export function AboutSection() {
  const stats = [
    { label: 'Years in Business', value: '10+', icon: Award },
    { label: 'Team Members', value: '50+', icon: Users },
    { label: 'Projects Completed', value: '200+', icon: Target },
    { label: 'Office Locations', value: '5', icon: Building2 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About Us</h1>
        <p className="text-gray-600">Learn more about our company and mission</p>
      </div>

      {/* Company Overview */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Company</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Welcome to our Customer Management System. We are a leading provider of business solutions,
            dedicated to helping companies manage their customer relationships effectively and efficiently.
          </p>
          <p>
            Our platform is designed to streamline your workflow, improve customer satisfaction, and
            drive business growth. With cutting-edge technology and user-friendly interfaces, we make
            customer management simple and effective.
          </p>
          <p>
            Founded in 2016, we have been serving businesses across various industries, from startups
            to large enterprises. Our commitment to excellence and innovation has made us a trusted
            partner for organizations worldwide.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-8 text-white">
          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p className="text-blue-50">
            To empower businesses with innovative tools and solutions that transform how they
            interact with customers, driving sustainable growth and success.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-sm p-8 text-white">
          <h3 className="text-xl font-bold mb-4">Our Vision</h3>
          <p className="text-purple-50">
            To be the global leader in customer management solutions, recognized for our
            commitment to innovation, quality, and customer success.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrity</h3>
            <p className="text-gray-600">
              We operate with honesty and transparency, building trust with our customers and partners.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in everything we do, delivering quality that exceeds expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
