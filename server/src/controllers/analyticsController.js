const { prisma } = require("../config/db");

// @desc    Get Admin Analytics
// @route   GET /api/analytics/admin
// @access  Private/Admin
const getAdminAnalytics = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalRevenueAgg = await prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { status: 'Completed' }
        });
        const totalRevenue = totalRevenueAgg._sum.totalAmount || 0;

        const totalOrders = await prisma.order.count();

        const todayRevenueAgg = await prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: {
                status: 'Completed',
                createdAt: { gte: today }
            }
        });
        const todayRevenue = todayRevenueAgg._sum.totalAmount || 0;

        const todayOrders = await prisma.order.count({
            where: { createdAt: { gte: today } }
        });

        const popularItems = await prisma.orderItem.groupBy({
            by: ['menuItemId'],
            _count: { menuItemId: true },
            orderBy: { _count: { menuItemId: 'desc' } },
            take: 5
        });

        const popularItemsWithDetails = await Promise.all(
            popularItems.map(async (item) => {
                const menuItem = await prisma.menuItem.findUnique({
                    where: { id: item.menuItemId }
                });
                return { ...menuItem, count: item._count.menuItemId };
            })
        );

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const dailyOrders = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(sevenDaysAgo);
            d.setDate(d.getDate() + i);

            const nextDay = new Date(d);
            nextDay.setDate(d.getDate() + 1);

            const count = await prisma.order.count({
                where: {
                    createdAt: {
                        gte: d,
                        lt: nextDay
                    }
                }
            });

            dailyOrders.push({
                date: d.toLocaleDateString('en-US', { weekday: 'short' }),
                orders: count
            });
        }

        res.json({
            totalRevenue,
            totalOrders,
            todayRevenue,
            todayOrders,
            popularItems: popularItemsWithDetails,
            dailyOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getStudentAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Total Spent
        const totalSpentAgg = await prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { userId, status: 'Completed' }
        });
        const totalSpent = totalSpentAgg._sum.totalAmount || 0;

        // 2. Total Orders
        const totalOrders = await prisma.order.count({
            where: { userId }
        });

        // 3. Active Subscriptions
        const activePlans = await prisma.subscription.count({
            where: {
                userId,
                validTo: { gte: new Date() },
                isActive: true
            }
        });


        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday
        startOfWeek.setHours(0, 0, 0, 0);

        const weeklyAttendance = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(d.getDate() + i);
            const nextDay = new Date(d);
            nextDay.setDate(d.getDate() + 1);

            const count = await prisma.order.count({
                where: {
                    userId,
                    createdAt: { gte: d, lt: nextDay }
                }
            });
            weeklyAttendance.push({ day: days[i], count });
        }

  
        const currentYear = new Date().getFullYear();
        const monthlyExpenses = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        for (let i = 0; i < 12; i++) {
            const startOfMonth = new Date(currentYear, i, 1);
            const endOfMonth = new Date(currentYear, i + 1, 1);

            const agg = await prisma.order.aggregate({
                _sum: { totalAmount: true },
                where: {
                    userId,
                    status: 'Completed',
                    createdAt: { gte: startOfMonth, lt: endOfMonth }
                }
            });
            monthlyExpenses.push({ month: months[i], amount: agg._sum.totalAmount || 0 });
        }

        res.json({
            totalSpent,
            totalOrders,
            activePlans,
            weeklyAttendance,
            monthlyExpenses
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAdminAnalytics,
    getStudentAnalytics
};
