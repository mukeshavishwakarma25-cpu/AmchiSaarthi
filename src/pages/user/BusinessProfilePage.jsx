import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { businessService } from '../../services/businessService';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './BusinessProfilePage.css';

export default function BusinessProfilePage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    constitutionType: 'Private Limited Company',
    industrySector: 'Manufacturing & Clean Tech',
    category: 'Small Enterprise',
    district: 'Pune',
    address: '',
    employees: 48,
    investment: 450,
    powerRequirement: '120 HP',
    pollutionCategory: 'Orange',
    gstin: '',
    pan: ''
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const biz = businessService.getBusinessById('BIZ-201');
    if (biz) setFormData(biz);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    businessService.updateBusiness('BIZ-201', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="business-profile-page">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">{t('nav.businessProfile')}</h1>
          <p className="page-subtitle">
            Configure your enterprise attributes to compute exact statutory clearances under Maharashtra Ease of Doing Business rules.
          </p>
        </div>
      </div>

      {saved && (
        <div className="save-success-alert">
          <span className="material-symbols-outlined">check_circle</span>
          <span>Business Profile successfully updated! Statutory compliance roadmap recalculated.</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card title="1. Enterprise Identity & Constitution" className="form-section-card">
          <div className="form-grid-2">
            <Input
              label="Legal Enterprise Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. GreenTech Solutions Pvt Ltd"
            />
            <div className="input-group">
              <label className="input-label">Constitution Type</label>
              <select
                name="constitutionType"
                className="input-field"
                value={formData.constitutionType}
                onChange={handleChange}
              >
                <option value="Proprietorship">Proprietorship</option>
                <option value="Partnership / LLP">Partnership / LLP</option>
                <option value="Private Limited Company">Private Limited Company</option>
                <option value="Public Limited Company">Public Limited Company</option>
                <option value="Cooperative Society">Cooperative Society</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <Input
              label="GSTIN Number"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              placeholder="27AABCG1234F1Z8"
            />
            <Input
              label="Enterprise PAN"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              placeholder="AABCG1234F"
            />
          </div>
        </Card>

        <Card title="2. Scale, Operations & Regulatory Classification" className="form-section-card">
          <div className="form-grid-3">
            <div className="input-group">
              <label className="input-label">Industry Sector</label>
              <select
                name="industrySector"
                className="input-field"
                value={formData.industrySector}
                onChange={handleChange}
              >
                <option value="Manufacturing & Clean Tech">Manufacturing & Clean Tech</option>
                <option value="Agro & Food Processing">Agro & Food Processing</option>
                <option value="IT & IT-Enabled Services (ITeS)">IT & IT-Enabled Services (ITeS)</option>
                <option value="Chemicals & Pharmaceuticals">Chemicals & Pharmaceuticals</option>
                <option value="Textiles & Apparel">Textiles & Apparel</option>
                <option value="Hospitality & Commercial">Hospitality & Commercial</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">MSME Scale Category</label>
              <select
                name="category"
                className="input-field"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Micro Enterprise">Micro Enterprise (Inv &lt; 1 Cr)</option>
                <option value="Small Enterprise">Small Enterprise (Inv &lt; 10 Cr)</option>
                <option value="Medium Enterprise">Medium Enterprise (Inv &lt; 50 Cr)</option>
                <option value="Large Scale Industry">Large Scale Industry</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">MPCB Pollution Classification</label>
              <select
                name="pollutionCategory"
                className="input-field"
                value={formData.pollutionCategory}
                onChange={handleChange}
              >
                <option value="White">White (Lowest Impact / Excluded)</option>
                <option value="Green">Green (Low Impact)</option>
                <option value="Orange">Orange (Moderate Impact - CTE required)</option>
                <option value="Red">Red (High Impact - Detailed EIA)</option>
              </select>
            </div>
          </div>

          <div className="form-grid-3">
            <Input
              label="Total Employees on Payroll"
              name="employees"
              type="number"
              value={formData.employees}
              onChange={handleChange}
              helperText="Determines Factories Act & ESIC applicability"
            />
            <Input
              label="Connected Power Load (HP / kW)"
              name="powerRequirement"
              value={formData.powerRequirement}
              onChange={handleChange}
              placeholder="e.g. 120 HP"
            />
            <Input
              label="Plant & Machinery Investment (₹ Lakhs)"
              name="investment"
              type="number"
              value={formData.investment}
              onChange={handleChange}
            />
          </div>
        </Card>

        <Card title="3. Establishment Location & District" className="form-section-card">
          <div className="form-grid-2">
            <div className="input-group">
              <label className="input-label">District in Maharashtra</label>
              <select
                name="district"
                className="input-field"
                value={formData.district}
                onChange={handleChange}
              >
                <option value="Pune">Pune</option>
                <option value="Mumbai City">Mumbai City</option>
                <option value="Mumbai Suburban">Mumbai Suburban</option>
                <option value="Thane">Thane</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Nashik">Nashik</option>
                <option value="Aurangabad (Chhatrapati Sambhajinagar)">Chhatrapati Sambhajinagar</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Solapur">Solapur</option>
              </select>
            </div>

            <Input
              label="Complete Physical Factory / Office Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Plot No., MIDC / Industrial Zone, Village/City"
            />
          </div>
        </Card>

        <div className="form-submit-row">
          <Button type="submit" variant="primary" size="lg" icon="save">
            Save Profile & Compute Dynamic Roadmap
          </Button>
        </div>
      </form>
    </div>
  );
}
