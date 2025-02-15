import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface JustDialLead {
  id: number;
  leadid: string;
  name: string;
  mobile: string;
  phone: string;
  email: string;
  lead_date: string;
  category: string;
  city: string;
  area: string;
  created_at: string;
  processed: boolean;
}

export default function JustDialLeads() {
  const [leads, setLeads] = useState<JustDialLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('justdial_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsProcessed = async (leadId: number) => {
    try {
      const { error } = await supabase
        .from('justdial_leads')
        .update({ processed: true })
        .eq('id', leadId);

      if (error) throw error;
      fetchLeads();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (loading) return <div className="p-4">Loading leads...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">JustDial Leads</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Lead ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Contact</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className={lead.processed ? 'bg-gray-50' : ''}>
                <td className="px-4 py-2 border">{lead.leadid}</td>
                <td className="px-4 py-2 border">{lead.name}</td>
                <td className="px-4 py-2 border">
                  <div>Mobile: {lead.mobile}</div>
                  {lead.phone && <div>Phone: {lead.phone}</div>}
                  {lead.email && <div>Email: {lead.email}</div>}
                </td>
                <td className="px-4 py-2 border">{lead.category}</td>
                <td className="px-4 py-2 border">
                  <div>{lead.city}</div>
                  {lead.area && <div>{lead.area}</div>}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded ${
                    lead.processed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lead.processed ? 'Processed' : 'New'}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {!lead.processed && (
                    <button
                      onClick={() => markAsProcessed(lead.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Mark Processed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 