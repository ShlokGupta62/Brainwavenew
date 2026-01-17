function systemInstruction() {
  return [
    'You are LogiHub Intelligence, an assistant for logistics operations.',
    'Be concise, actionable, and use the provided context only.',
    'If data is missing, say what is missing and give safe next steps.',
    'Never invent tracking events or precise ETAs; explain uncertainty.',
    'When giving recommendations, include a short rationale and risks.'
  ].join('\n');
}

function promptForInsight(type, context) {
  const ctx = context || {};
  switch (type) {
    case 'shipment_recommendation':
      return [
        'Task: Recommend the best shipment plan (vehicle class, scheduling, packing hints).',
        `Origin: ${ctx.origin || 'unknown'}`,
        `Destination: ${ctx.destination || 'unknown'}`,
        `WeightKg: ${ctx.weightKg ?? 'unknown'}`,
        `TruckTypeHint: ${ctx.truckType || 'none'}`,
        `DistanceKm: ${ctx.distanceKm ?? 'unknown'}`,
        'Output JSON with keys: recommendation, rationale, risks, nextSteps.'
      ].join('\n');

    case 'eta_explain':
      return [
        'Task: Explain ETA uncertainty and key drivers (traffic, weather, dwell, maintenance).',
        `TrackingId: ${ctx.trackingId || 'unknown'}`,
        `Status: ${ctx.status || 'unknown'}`,
        `LastKnownLocation: ${ctx.lastKnownLocation || 'unknown'}`,
        `RouteSummary: ${ctx.routeSummary || 'unknown'}`,
        'Return a short explanation and 3 monitoring signals.'
      ].join('\n');

    case 'route_delay_insight':
      return [
        'Task: Provide route and delay insights and mitigation actions.',
        `Route: ${ctx.routeSummary || 'unknown'}`,
        `Constraints: ${ctx.constraints || 'none'}`,
        `KnownDelayCause: ${ctx.delayCause || 'unknown'}`,
        'Return bullet points: cause, impact, mitigation, customerMessage.'
      ].join('\n');

    case 'demand_forecast_summary':
      return [
        'Task: Summarize demand forecast signals for a logistics manager.',
        'You will receive aggregated order volume data; summarize trends and actions.',
        `WindowDays: ${ctx.windowDays || 30}`,
        `Aggregates: ${JSON.stringify(ctx.aggregates || {}, null, 0)}`,
        'Output: 5 bullets max + 2 recommended actions.'
      ].join('\n');

    case 'manager_decision_intel':
      return [
        'Task: Provide decision intelligence for a logistics manager dashboard.',
        `KPIs: ${JSON.stringify(ctx.kpis || {}, null, 0)}`,
        `Hotspots: ${JSON.stringify(ctx.hotspots || [], null, 0)}`,
        'Output: top 3 risks + top 3 actions + 1 quick win.'
      ].join('\n');

    case 'customer_support':
    default:
      return [
        'Task: Respond to a customer support message about logistics shipments.',
        `UserMessage: ${ctx.message || ''}`,
        `Language: ${ctx.language || 'en'}`,
        `User: ${JSON.stringify(ctx.user || null)}`,
        `RecentMessages: ${JSON.stringify(ctx.recentMessages || [])}`,
        'Be friendly, precise, and ask one clarifying question if needed.'
      ].join('\n');
  }
}

module.exports = { systemInstruction, promptForInsight };
