import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import UserDashboardLayout from "./components/layout/UserDashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AIChatModal from "./components/common/AIChatModal";
import ScrollToTop from "./components/common/ScrollToTop";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Public Pages
import Home from "./pages/public/Home";
import ProductCatalog from "./pages/public/ProductCatalog";
import ProductDetail from "./pages/public/ProductDetail";
import CartCheckout from "./pages/public/CartCheckout";
import BoutiqueProfile from "./pages/public/BoutiqueProfile";
import BrandDirectory from "./pages/public/BrandDirectory";
import BulkRFQRequest from "./pages/public/BulkRFQRequest";
import C2CGarageSale from "./pages/public/C2CGarageSale";
import ChoiceSuperDeals from "./pages/public/ChoiceSuperDeals";
import ClearanceOutlet from "./pages/public/ClearanceOutlet";
import ClickCollect from "./pages/public/ClickCollect";
import CoinsRewardExchange from "./pages/public/CoinsRewardExchange";
import ConflictCenter from "./pages/public/ConflictCenter";
import CouponCenter from "./pages/public/CouponCenter";
import CrowdfundingLaunchpad from "./pages/public/CrowdfundingLaunchpad";
import DailyQuizRewards from "./pages/public/DailyQuizRewards";
import DigitalMarket from "./pages/public/DigitalMarket";
import DigitalProductDetail from "./pages/public/DigitalProductDetail";
import EcoImpact from "./pages/public/EcoImpact";
import FlashDeals from "./pages/public/FlashDeals";
import FranchiseDirectory from "./pages/public/FranchiseDirectory";
import GiftCards from "./pages/public/GiftCards";
import GiftFinderWizard from "./pages/public/GiftFinderWizard";
import GiftRegistry from "./pages/public/GiftRegistry";
import GlobalShippingHub from "./pages/public/GlobalShippingHub";
import GroupBuy from "./pages/public/GroupBuy";
import HelpCenter from "./pages/public/HelpCenter";
import InfluencerHub from "./pages/public/InfluencerHub";
import Legal from "./pages/public/Legal";
import LiveAuctions from "./pages/public/LiveAuctions";
import LiveStreamShopping from "./pages/public/LiveStreamShopping";
import LuckyDraw from "./pages/public/LuckyDraw";
import MysteryDeal from "./pages/public/MysteryDeal";
import OrderTracker from "./pages/public/OrderTracker";
import PriceNegotiation from "./pages/public/PriceNegotiation";
import PriceTracker from "./pages/public/PriceTracker";
import ProductCompare from "./pages/public/ProductCompare";
import ProductCustomizer from "./pages/public/ProductCustomizer";
import ReferralProgram from "./pages/public/ReferralProgram";
import SizeGuideCalculator from "./pages/public/SizeGuideCalculator";
import SuperValueDeals from "./pages/public/SuperValueDeals";
import SupportTickets from "./pages/public/SupportTickets";
import TradeInRefurbished from "./pages/public/TradeInRefurbished";
import VirtualTryOn from "./pages/public/VirtualTryOn";
import VisualSearch from "./pages/public/VisualSearch";
import AIReviewSummarizer from "./pages/public/AIReviewSummarizer";
import ARProductViewer from "./pages/public/ARProductViewer";
import AliExpressTopRankings from "./pages/public/AliExpressTopRankings";
import AliExpressTrendingSearches from "./pages/public/AliExpressTrendingSearches";

// User / Seller Pages
import UserProfile from "./pages/user/UserProfile";
import UserOrders from "./pages/user/UserOrders";
import UserPaymentMethods from "./pages/user/UserPaymentMethods";
import UserAddresses from "./pages/user/UserAddresses";
import UserWishlistPage from "./pages/user/UserWishlistPage";
import UserRecurringOrders from "./pages/user/UserRecurringOrders";
import CoinsWallet from "./pages/user/CoinsWallet";
import SellerDashboard from "./pages/user/SellerDashboard";
import SellerAnalytics from "./pages/user/SellerAnalytics";
import SellerInventory from "./pages/user/SellerInventory";
import SellerPayouts from "./pages/user/SellerPayouts";
import SellerReturns from "./pages/user/SellerReturns";
import SellerReviewsManager from "./pages/user/SellerReviewsManager";
import SellerShippingSettings from "./pages/user/SellerShippingSettings";
import SellerStaffManager from "./pages/user/SellerStaffManager";
import SellerStockAlerts from "./pages/user/SellerStockAlerts";
import SellerVideoStudio from "./pages/user/SellerVideoStudio";
import SellerAutoBot from "./pages/user/SellerAutoBot";
import SellerBulkImport from "./pages/user/SellerBulkImport";
import SellerCouponBuilder from "./pages/user/SellerCouponBuilder";
import SellerCouriers from "./pages/user/SellerCouriers";
import SellerCustomsDuty from "./pages/user/SellerCustomsDuty";
import SellerDigitalGoods from "./pages/user/SellerDigitalGoods";
import SellerLoyaltyPoints from "./pages/user/SellerLoyaltyPoints";
import MetaAdsManager from "./pages/user/MetaAdsManager";
import SocialFriends from "./pages/user/SocialFriends";
import Subscriptions from "./pages/user/Subscriptions";
import VendorStorefrontManager from "./pages/user/VendorStorefrontManager";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import AdminPlatformSettings from "./pages/admin/AdminPlatformSettings";
import AdminContactMessages from "./pages/admin/AdminContactMessages";
import AdminNewsletterSubscribers from "./pages/admin/AdminNewsletterSubscribers";
import AdminPaymentProofs from "./pages/admin/AdminPaymentProofs";
import AdminSMTPSettings from "./pages/admin/AdminSMTPSettings";
import AdminSecurityBans from "./pages/admin/AdminSecurityBans";
import AdminSystemHealth from "./pages/admin/AdminSystemHealth";
import AdminTierPlansCMS from "./pages/admin/AdminTierPlansCMS";
import AdminAIModeration from "./pages/admin/AdminAIModeration";
import AdminAds from "./pages/admin/AdminAds";
import AdminAffiliateTiers from "./pages/admin/AdminAffiliateTiers";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import AdminBankDetailsCMS from "./pages/admin/AdminBankDetailsCMS";
import AdminCMS from "./pages/admin/AdminCMS";
import AdminCategoryManager from "./pages/admin/AdminCategoryManager";
import AdminChatModeration from "./pages/admin/AdminChatModeration";
import AdminCoinPacksCMS from "./pages/admin/AdminCoinPacksCMS";
import AdminCommissionMatrix from "./pages/admin/AdminCommissionMatrix";
import AdminCouponsCMS from "./pages/admin/AdminCouponsCMS";
import AdminCustomDomains from "./pages/admin/AdminCustomDomains";
import AdminDDoSShield from "./pages/admin/AdminDDoSShield";
import AdminDatabaseBackups from "./pages/admin/AdminDatabaseBackups";
import AdminDispatchTower from "./pages/admin/AdminDispatchTower";
import AdminDisputeRules from "./pages/admin/AdminDisputeRules";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminErrorLogs from "./pages/admin/AdminErrorLogs";
import AdminEscrowManager from "./pages/admin/AdminEscrowManager";
import AdminExchangeSync from "./pages/admin/AdminExchangeSync";
import AdminFinancialReports from "./pages/admin/AdminFinancialReports";
import AdminFlashDealsCMS from "./pages/admin/AdminFlashDealsCMS";
import AdminFooterCMS from "./pages/admin/AdminFooterCMS";
import AdminFraudRadar from "./pages/admin/AdminFraudRadar";
import AdminGDPRDesk from "./pages/admin/AdminGDPRDesk";
import AdminIPGeolocation from "./pages/admin/AdminIPGeolocation";
import AdminLegalCMS from "./pages/admin/AdminLegalCMS";
import AdminLocalesEditor from "./pages/admin/AdminLocalesEditor";
import AdminMaintenanceMode from "./pages/admin/AdminMaintenanceMode";
import AdminMultiTenant from "./pages/admin/AdminMultiTenant";
import AdminNavbarCMS from "./pages/admin/AdminNavbarCMS";
import AdminNotificationBroadcaster from "./pages/admin/AdminNotificationBroadcaster";
import AdminPayoutSchedules from "./pages/admin/AdminPayoutSchedules";
import AdminProShops from "./pages/admin/AdminProShops";
import AdminProductInspection from "./pages/admin/AdminProductInspection";
import AdminPushSchedules from "./pages/admin/AdminPushSchedules";
import AdminSMSGateway from "./pages/admin/AdminSMSGateway";
import AdminSSLMonitor from "./pages/admin/AdminSSLMonitor";
import AdminSubscriptionsCMS from "./pages/admin/AdminSubscriptionsCMS";
import AdminSupplierCertification from "./pages/admin/AdminSupplierCertification";
import AdminTaxInvoices from "./pages/admin/AdminTaxInvoices";
import AdminTierPageAccess from "./pages/admin/AdminTierPageAccess";
import AdminUserHeatmaps from "./pages/admin/AdminUserHeatmaps";
import AdminWarehouses from "./pages/admin/AdminWarehouses";
import AdminWebhooksManager from "./pages/admin/AdminWebhooksManager";
import AdminWordCloud from "./pages/admin/AdminWordCloud";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <ScrollToTop />
      <Navbar />

      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartCheckout />} />
          <Route path="/boutique/:id" element={<BoutiqueProfile />} />
          <Route path="/brands" element={<BrandDirectory />} />
          <Route path="/rfq" element={<BulkRFQRequest />} />
          <Route path="/bulk-request" element={<BulkRFQRequest />} />
          <Route path="/garage-sale" element={<C2CGarageSale />} />
          <Route path="/super-deals" element={<ChoiceSuperDeals />} />
          <Route path="/choice-deals" element={<ChoiceSuperDeals />} />
          <Route path="/clearance" element={<ClearanceOutlet />} />
          <Route path="/click-collect" element={<ClickCollect />} />
          <Route path="/coins-exchange" element={<CoinsRewardExchange />} />
          <Route path="/coins-rewards" element={<CoinsRewardExchange />} />
          <Route path="/disputes" element={<ConflictCenter />} />
          <Route path="/conflict-center" element={<ConflictCenter />} />
          <Route path="/coupons" element={<CouponCenter />} />
          <Route path="/crowdfunding" element={<CrowdfundingLaunchpad />} />
          <Route path="/quiz" element={<DailyQuizRewards />} />
          <Route path="/quiz-rewards" element={<DailyQuizRewards />} />
          <Route path="/digital" element={<DigitalMarket />} />
          <Route path="/digital-market" element={<DigitalMarket />} />
          <Route path="/digital-product/:id" element={<DigitalProductDetail />} />
          <Route path="/eco" element={<EcoImpact />} />
          <Route path="/flash-deals" element={<FlashDeals />} />
          <Route path="/franchise" element={<FranchiseDirectory />} />
          <Route path="/franchises" element={<FranchiseDirectory />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/gift-finder" element={<GiftFinderWizard />} />
          <Route path="/gift-registry" element={<GiftRegistry />} />
          <Route path="/global-shipping" element={<GlobalShippingHub />} />
          <Route path="/group-buy" element={<GroupBuy />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/influencers" element={<InfluencerHub />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/auctions" element={<LiveAuctions />} />
          <Route path="/livestream" element={<LiveStreamShopping />} />
          <Route path="/lucky-draw" element={<LuckyDraw />} />
          <Route path="/mystery-deal" element={<MysteryDeal />} />
          <Route path="/order-tracker" element={<OrderTracker />} />
          <Route path="/negotiate" element={<PriceNegotiation />} />
          <Route path="/price-tracker" element={<PriceTracker />} />
          <Route path="/compare" element={<ProductCompare />} />
          <Route path="/customizer" element={<ProductCustomizer />} />
          <Route path="/referral" element={<ReferralProgram />} />
          <Route path="/size-guide" element={<SizeGuideCalculator />} />
          <Route path="/super-value" element={<SuperValueDeals />} />
          <Route path="/support-tickets" element={<SupportTickets />} />
          <Route path="/trade-in" element={<TradeInRefurbished />} />
          <Route path="/virtual-tryon" element={<VirtualTryOn />} />
          <Route path="/visual-search" element={<VisualSearch />} />
          <Route path="/ai-reviews" element={<AIReviewSummarizer />} />
          <Route path="/ai-chat" element={<AIChatModal isOpen={true} onClose={() => window.history.back()} />} />
          <Route path="/ar-viewer" element={<ARProductViewer />} />
          <Route path="/ar-view" element={<ARProductViewer />} />
          <Route path="/top-rankings" element={<AliExpressTopRankings />} />
          <Route path="/trending-searches" element={<AliExpressTrendingSearches />} />

          {/* User & Seller Dashboard Routes (wrapped in UserDashboardLayout) */}
          <Route
            path="/dashboard"
            element={
              <UserDashboardLayout>
                <UserProfile />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <UserDashboardLayout>
                <UserProfile />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/orders"
            element={
              <UserDashboardLayout>
                <UserOrders />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/user/orders"
            element={
              <UserDashboardLayout>
                <UserOrders />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/payment-methods"
            element={
              <UserDashboardLayout>
                <UserPaymentMethods />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/dashboard/payment-methods"
            element={
              <UserDashboardLayout>
                <UserPaymentMethods />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/addresses"
            element={
              <UserDashboardLayout>
                <UserAddresses />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/user/addresses"
            element={
              <UserDashboardLayout>
                <UserAddresses />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <UserDashboardLayout>
                <UserWishlistPage />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/user/wishlist"
            element={
              <UserDashboardLayout>
                <UserWishlistPage />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/recurring-orders"
            element={
              <UserDashboardLayout>
                <UserRecurringOrders />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/user/recurring-orders"
            element={
              <UserDashboardLayout>
                <UserRecurringOrders />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/wallet"
            element={
              <UserDashboardLayout>
                <CoinsWallet />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/coins"
            element={
              <UserDashboardLayout>
                <CoinsWallet />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/dashboard"
            element={
              <UserDashboardLayout>
                <SellerDashboard />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/analytics"
            element={
              <UserDashboardLayout>
                <SellerAnalytics />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/inventory"
            element={
              <UserDashboardLayout>
                <SellerInventory />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/payouts"
            element={
              <UserDashboardLayout>
                <SellerPayouts />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/returns"
            element={
              <UserDashboardLayout>
                <SellerReturns />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/reviews"
            element={
              <UserDashboardLayout>
                <SellerReviewsManager />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/shipping"
            element={
              <UserDashboardLayout>
                <SellerShippingSettings />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/staff"
            element={
              <UserDashboardLayout>
                <SellerStaffManager />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/stock-alerts"
            element={
              <UserDashboardLayout>
                <SellerStockAlerts />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/video-studio"
            element={
              <UserDashboardLayout>
                <SellerVideoStudio />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/bot"
            element={
              <UserDashboardLayout>
                <SellerAutoBot />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/import"
            element={
              <UserDashboardLayout>
                <SellerBulkImport />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/coupons"
            element={
              <UserDashboardLayout>
                <SellerCouponBuilder />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/couriers"
            element={
              <UserDashboardLayout>
                <SellerCouriers />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/customs"
            element={
              <UserDashboardLayout>
                <SellerCustomsDuty />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/digital"
            element={
              <UserDashboardLayout>
                <SellerDigitalGoods />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/digital-goods"
            element={
              <UserDashboardLayout>
                <SellerDigitalGoods />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/import"
            element={
              <UserDashboardLayout>
                <SellerBulkImport />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/bulk-import"
            element={
              <UserDashboardLayout>
                <SellerBulkImport />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/loyalty"
            element={
              <UserDashboardLayout>
                <SellerLoyaltyPoints />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/ads"
            element={
              <UserDashboardLayout>
                <MetaAdsManager />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/ads-manager"
            element={
              <UserDashboardLayout>
                <MetaAdsManager />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/social"
            element={
              <UserDashboardLayout>
                <SocialFriends />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/friends"
            element={
              <UserDashboardLayout>
                <SocialFriends />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <UserDashboardLayout>
                <Subscriptions />
              </UserDashboardLayout>
            }
          />
          <Route
            path="/seller/storefront"
            element={
              <UserDashboardLayout>
                <VendorStorefrontManager />
              </UserDashboardLayout>
            }
          />

          {/* Admin Panel Routes (Protected with SuperAdmin Role) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="superAdmin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="settings" element={<AdminPlatformSettings />} />
            <Route path="contact" element={<AdminContactMessages />} />
            <Route path="contact-messages" element={<AdminContactMessages />} />
            <Route path="newsletter" element={<AdminNewsletterSubscribers />} />
            <Route path="newsletter-subscribers" element={<AdminNewsletterSubscribers />} />
            <Route path="payments" element={<AdminPaymentProofs />} />
            <Route path="payment-proofs" element={<AdminPaymentProofs />} />
            <Route path="smtp" element={<AdminSMTPSettings />} />
            <Route path="smtp-settings" element={<AdminSMTPSettings />} />
            <Route path="security" element={<AdminSecurityBans />} />
            <Route path="bans" element={<AdminSecurityBans />} />
            <Route path="health" element={<AdminSystemHealth />} />
            <Route path="system-health" element={<AdminSystemHealth />} />
            <Route path="tiers" element={<AdminTierPlansCMS />} />
            <Route path="tier-plans" element={<AdminTierPlansCMS />} />
            <Route path="ai-moderation" element={<AdminAIModeration />} />
            <Route path="ads" element={<AdminAds />} />
            <Route path="affiliate" element={<AdminAffiliateTiers />} />
            <Route path="affiliate-tiers" element={<AdminAffiliateTiers />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
            <Route path="bank-details" element={<AdminBankDetailsCMS />} />
            <Route path="cms-bank" element={<AdminBankDetailsCMS />} />
            <Route path="cms" element={<AdminCMS />} />
            <Route path="categories" element={<AdminCategoryManager />} />
            <Route path="chat-moderation" element={<AdminChatModeration />} />
            <Route path="chats-moderation" element={<AdminChatModeration />} />
            <Route path="coin-packs" element={<AdminCoinPacksCMS />} />
            <Route path="cms-coins" element={<AdminCoinPacksCMS />} />
            <Route path="commission" element={<AdminCommissionMatrix />} />
            <Route path="commissions" element={<AdminCommissionMatrix />} />
            <Route path="coupons" element={<AdminCouponsCMS />} />
            <Route path="custom-domains" element={<AdminCustomDomains />} />
            <Route path="ddos" element={<AdminDDoSShield />} />
            <Route path="ddos-shield" element={<AdminDDoSShield />} />
            <Route path="backups" element={<AdminDatabaseBackups />} />
            <Route path="database-backups" element={<AdminDatabaseBackups />} />
            <Route path="dispatch" element={<AdminDispatchTower />} />
            <Route path="dispatch-tower" element={<AdminDispatchTower />} />
            <Route path="dispute-rules" element={<AdminDisputeRules />} />
            <Route path="disputes" element={<AdminDisputes />} />
            <Route path="error-logs" element={<AdminErrorLogs />} />
            <Route path="escrow" element={<AdminEscrowManager />} />
            <Route path="exchange-sync" element={<AdminExchangeSync />} />
            <Route path="financial" element={<AdminFinancialReports />} />
            <Route path="reports" element={<AdminFinancialReports />} />
            <Route path="flash-deals" element={<AdminFlashDealsCMS />} />
            <Route path="footer" element={<AdminFooterCMS />} />
            <Route path="cms-footer" element={<AdminFooterCMS />} />
            <Route path="fraud-radar" element={<AdminFraudRadar />} />
            <Route path="gdpr" element={<AdminGDPRDesk />} />
            <Route path="geolocation" element={<AdminIPGeolocation />} />
            <Route path="ip-geolocation" element={<AdminIPGeolocation />} />
            <Route path="legal" element={<AdminLegalCMS />} />
            <Route path="cms-legal" element={<AdminLegalCMS />} />
            <Route path="locales" element={<AdminLocalesEditor />} />
            <Route path="maintenance" element={<AdminMaintenanceMode />} />
            <Route path="maintenance-mode" element={<AdminMaintenanceMode />} />
            <Route path="multi-tenant" element={<AdminMultiTenant />} />
            <Route path="navbar" element={<AdminNavbarCMS />} />
            <Route path="cms-navbar" element={<AdminNavbarCMS />} />
            <Route path="notifications" element={<AdminNotificationBroadcaster />} />
            <Route path="notifications-sender" element={<AdminNotificationBroadcaster />} />
            <Route path="payout-schedules" element={<AdminPayoutSchedules />} />
            <Route path="pro-shops" element={<AdminProShops />} />
            <Route path="inspection" element={<AdminProductInspection />} />
            <Route path="product-inspection" element={<AdminProductInspection />} />
            <Route path="push" element={<AdminPushSchedules />} />
            <Route path="push-schedules" element={<AdminPushSchedules />} />
            <Route path="sms" element={<AdminSMSGateway />} />
            <Route path="sms-gateway" element={<AdminSMSGateway />} />
            <Route path="ssl" element={<AdminSSLMonitor />} />
            <Route path="ssl-monitor" element={<AdminSSLMonitor />} />
            <Route path="subscriptions-cms" element={<AdminSubscriptionsCMS />} />
            <Route path="cms-subscriptions" element={<AdminSubscriptionsCMS />} />
            <Route path="supplier-cert" element={<AdminSupplierCertification />} />
            <Route path="suppliers" element={<AdminSupplierCertification />} />
            <Route path="tax" element={<AdminTaxInvoices />} />
            <Route path="tax-invoices" element={<AdminTaxInvoices />} />
            <Route path="tier-access" element={<AdminTierPageAccess />} />
            <Route path="heatmaps" element={<AdminUserHeatmaps />} />
            <Route path="user-heatmaps" element={<AdminUserHeatmaps />} />
            <Route path="warehouses" element={<AdminWarehouses />} />
            <Route path="webhooks" element={<AdminWebhooksManager />} />
            <Route path="word-cloud" element={<AdminWordCloud />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}